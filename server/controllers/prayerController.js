import PrayerTiming from '../models/PrayerTiming.js';

/**
 * @route   GET /api/prayers/today
 * @desc    Get today's prayer timings (or most recent fallback)
 * @access  Public
 */
export const getTodayPrayerTimes = async (req, res, next) => {
    try {
        // 1. Determine today's start and end bounds in local DB timezone
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const startOfTomorrow = new Date(startOfToday);
        startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

        // 2. Try to find the exact match for today
        let timing = await PrayerTiming.findOne({
            date: { $gte: startOfToday, $lt: startOfTomorrow }
        });

        let isToday = true;

        // 3. Fallback: If no timing explicitly set for today, get the most recent one
        if (!timing) {
            timing = await PrayerTiming.findOne().sort({ date: -1 });
            isToday = false;
        }

        if (!timing) {
            return res.status(404).json({ success: false, message: 'No prayer timings configured in the system.' });
        }

        return res.status(200).json({
            success: true,
            data: {
                fajr: timing.fajr,
                sunrise: timing.sunrise,
                zuhr: timing.zuhr,
                asr: timing.asr,
                maghrib: timing.maghrib,
                isha: timing.isha,
                jummah: timing.jummah || '',
                hijriDate: timing.hijriDate || '',
                date: timing.date,
                isToday
            }
        });
    } catch (error) {
        next(error);
    }
};


/**
 * @route   GET /api/prayers
 * @desc    Get all prayer timings (paginated, with optional month/year filter)
 * @access  Public
 */
export const getAllPrayerTimes = async (req, res, next) => {
    try {
        const { month, year, page = 1, limit = 30 } = req.query;

        const query = {};

        // Filter by specific month and year if provided
        if (month && year) {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 1); // 1st of next month
            query.date = { $gte: startDate, $lt: endDate };
        } else if (year) {
            const startDate = new Date(year, 0, 1);
            const endDate = new Date(parseInt(year) + 1, 0, 1);
            query.date = { $gte: startDate, $lt: endDate };
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const prayers = await PrayerTiming.find(query)
            .sort({ date: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await PrayerTiming.countDocuments(query);

        return res.status(200).json({
            success: true,
            count: prayers.length,
            total,
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / limit),
            data: prayers,
        });
    } catch (error) {
        next(error);
    }
};


/**
 * @route   PUT /api/prayers/update
 * @desc    Upsert a prayer timing for a specific date
 * @access  Protected / Admin Only
 */
export const updatePrayerTimes = async (req, res, next) => {
    try {
        const { date, fajr, sunrise, zuhr, asr, maghrib, isha, jummah, hijriDate } = req.body;

        // Normalizing the date to midnight to ensure clean lookup
        const targetDate = new Date(date);
        const startOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());

        const updateData = {
            date: startOfDay,
            fajr,
            sunrise,
            zuhr,
            asr,
            maghrib,
            isha,
            jummah,
            hijriDate, // Note: Future enhancement - auto Gregorian-to-Hijri conversion could be added here
            updatedBy: req.user.id
        };

        // findOneAndUpdate with upsert: true acts as "Create if not exists, Update if exists"
        const savedTiming = await PrayerTiming.findOneAndUpdate(
            { date: startOfDay },
            updateData,
            { new: true, upsert: true, runValidators: true }
        );

        return res.status(200).json({
            success: true,
            message: 'Prayer times updated successfully',
            data: savedTiming
        });
    } catch (error) {
        next(error);
    }
};


/**
 * @route   DELETE /api/prayers/:id
 * @desc    Delete a specified prayer timing 
 * @access  Protected / Admin Only
 */
export const deletePrayerTimes = async (req, res, next) => {
    try {
        const { id } = req.params;

        const timing = await PrayerTiming.findById(id);

        if (!timing) {
            return res.status(404).json({ success: false, message: 'Prayer timing not found' });
        }

        await timing.deleteOne();

        return res.status(200).json({
            success: true,
            message: 'Prayer timing removed successfully'
        });
    } catch (error) {
        next(error);
    }
};
