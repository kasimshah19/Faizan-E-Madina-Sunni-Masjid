import Event from '../models/Event.js';
import EventRegistration from '../models/EventRegistration.js';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

// @desc    Create a new event
// @route   POST /api/events
// @access  Private (Admin/Committee)
export const createEvent = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const {
            title,
            description,
            category,
            date,
            startTime,
            endTime,
            location,
            bannerImage,
            maxAttendees,
            isRegistrationRequired,
        } = req.body;

        const event = await Event.create({
            title,
            description,
            category,
            date,
            startTime,
            endTime,
            location,
            bannerImage,
            maxAttendees,
            isRegistrationRequired: isRegistrationRequired || false,
            createdBy: req.user.id,
            status: 'upcoming',
        });

        res.status(201).json({
            success: true,
            data: event,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getAllEvents = async (req, res, next) => {
    try {
        const { category, status, upcoming, page = 1, limit = 10 } = req.query;

        // Build filter
        let filter = {};
        if (category) filter.category = category;
        if (status) filter.status = status;
        if (upcoming === 'true') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            filter.date = { $gte: today };
        }

        const parsedPage = parseInt(page, 10) || 1;
        const parsedLimit = parseInt(limit, 10) || 10;
        const startIndex = (parsedPage - 1) * parsedLimit;

        const events = await Event.find(filter)
            .sort({ date: 1 })
            .skip(startIndex)
            .limit(parsedLimit)
            .populate('createdBy', 'fullName email')
            .lean();

        // Attach spotsRemaining
        const eventIds = events.map(e => e._id);

        // Aggregate registrations per event
        const registrations = await EventRegistration.aggregate([
            {
                $match: {
                    event: { $in: eventIds },
                    attendanceStatus: { $ne: 'cancelled' }
                }
            },
            {
                $group: {
                    _id: '$event',
                    count: { $sum: 1 }
                }
            }
        ]);

        const registrationMap = registrations.reduce((acc, curr) => {
            acc[curr._id.toString()] = curr.count;
            return acc;
        }, {});

        const enrichedEvents = events.map(e => {
            let spotsRemaining = null;
            if (e.maxAttendees) {
                const registeredCount = registrationMap[e._id.toString()] || 0;
                spotsRemaining = e.maxAttendees - registeredCount;
            }
            return { ...e, spotsRemaining };
        });

        res.status(200).json({
            success: true,
            count: enrichedEvents.length,
            pagination: {
                page: parsedPage,
                limit: parsedLimit
            },
            data: enrichedEvents,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Public
export const getEventById = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('createdBy', 'fullName email')
            .lean();

        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        let spotsRemaining = null;
        if (event.maxAttendees) {
            const registeredCount = await EventRegistration.countDocuments({
                event: event._id,
                attendanceStatus: { $ne: 'cancelled' }
            });
            spotsRemaining = event.maxAttendees - registeredCount;
        }

        res.status(200).json({
            success: true,
            data: { ...event, spotsRemaining },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update an event 
// @route   PUT /api/events/:id
// @access  Private (Admin/Committee)
export const updateEvent = async (req, res, next) => {
    try {
        let event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        // Ownership check for committee members
        if (req.user.role === 'committee' && event.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Forbidden � you can only update your own events' });
        }

        // Mass Assignment Protection: explicitly pick allowed fields to prevent committee members injecting `status`, `createdBy`, etc.
        const allowedUpdates = {};
        const { title, description, category, date, startTime, endTime, location, bannerImage, maxAttendees, isRegistrationRequired } = req.body;

        if (title !== undefined) allowedUpdates.title = title;
        if (description !== undefined) allowedUpdates.description = description;
        if (category !== undefined) allowedUpdates.category = category;
        if (date !== undefined) allowedUpdates.date = date;
        if (startTime !== undefined) allowedUpdates.startTime = startTime;
        if (endTime !== undefined) allowedUpdates.endTime = endTime;
        if (location !== undefined) allowedUpdates.location = location;
        if (bannerImage !== undefined) allowedUpdates.bannerImage = bannerImage;

        // Admin overrides for sensitive structural fields
        if (req.user.role === 'admin' || req.user.role === 'superadmin') {
            if (req.body.status !== undefined) allowedUpdates.status = req.body.status;
            if (maxAttendees !== undefined) allowedUpdates.maxAttendees = maxAttendees;
            if (isRegistrationRequired !== undefined) allowedUpdates.isRegistrationRequired = isRegistrationRequired;
        }

        event = await Event.findByIdAndUpdate(req.params.id, allowedUpdates, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            data: event,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private (Admin only)
export const deleteEvent = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        // Cascade delete related registrations
        await EventRegistration.deleteMany({ event: req.params.id });
        await event.deleteOne();
        if (req.user) {
            logAction({
                userId: req.user.id,
                action: 'EVENT_DELETED',
                module: 'Events',
                targetId: event._id,
                details: { title: event.title },
                req
            });
        }

        res.status(200).json({
            success: true,
            data: {},
            message: 'Event and associated registrations removed'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    RSVP to an event
// @route   POST /api/events/:id/rsvp
// @access  Private
export const rsvpToEvent = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const eventId = req.params.id;
        const userId = req.user.id;

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        // Validate registration requirements
        if (!event.isRegistrationRequired) {
            return res.status(400).json({ success: false, message: 'This event does not require registration' });
        }

        // Check if event is in the past
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);
        if (eventDate < today) {
            return res.status(400).json({ success: false, message: 'Cannot RSVP to a past event' });
        }

        // Check availability
        let registeredCount = await EventRegistration.countDocuments({
            event: eventId,
            attendanceStatus: { $ne: 'cancelled' }
        });

        if (event.maxAttendees && registeredCount >= event.maxAttendees) {
            return res.status(400).json({ success: false, message: 'Event is full' });
        }

        // Create Registration
        try {
            const registration = await EventRegistration.create({
                event: eventId,
                user: userId,
                attendanceStatus: 'registered'
            });

            const spotsRemaining = event.maxAttendees ? (event.maxAttendees - (registeredCount + 1)) : null;

            res.status(201).json({
                success: true,
                data: registration,
                spotsRemaining
            });
        } catch (error) {
            if (error.code === 11000) {
                return res.status(400).json({ success: false, message: 'You have already registered for this event' });
            }
            throw error;
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Cancel RSVP
// @route   DELETE /api/events/:id/rsvp
// @access  Private
export const cancelRsvp = async (req, res, next) => {
    try {
        const eventId = req.params.id;
        let filter = { event: eventId, user: req.user.id };

        const registration = await EventRegistration.findOne(filter);

        if (!registration) {
            return res.status(404).json({ success: false, message: 'Registration not found' });
        }

        await registration.deleteOne();

        res.status(200).json({
            success: true,
            message: 'RSVP cancelled successfully'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all registrations for an event
// @route   GET /api/events/:id/registrations
// @access  Private (Admin/Committee)
export const getEventRegistrations = async (req, res, next) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        // Committee ownership check
        if (req.user.role === 'committee' && event.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Forbidden � you can only view registrations for your own events' });
        }

        const registrations = await EventRegistration.find({ event: eventId })
            .populate('user', 'fullName email role')
            .sort({ registeredAt: -1 });

        res.status(200).json({
            success: true,
            count: registrations.length,
            data: registrations
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get user's RSVPs
// @route   GET /api/events/my-rsvps
// @access  Private
export const getMyRsvps = async (req, res, next) => {
    try {
        const registrations = await EventRegistration.find({ user: req.user.id })
            .populate('event')
            .sort({ registeredAt: -1 });

        res.status(200).json({
            success: true,
            count: registrations.length,
            data: registrations
        });
    } catch (error) {
        next(error);
    }
};
