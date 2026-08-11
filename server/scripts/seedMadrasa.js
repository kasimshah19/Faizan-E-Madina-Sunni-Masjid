import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';
import Course from '../models/Course.js';
import Attendance from '../models/Attendance.js';
import Grade from '../models/Grade.js';
import User from '../models/User.js';

dotenv.config();

const seedMadrasa = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for seeding Madrasa Module...');

        // Need an admin for 'markedBy' and 'recordedBy' fields
        let admin = await User.findOne({ role: 'admin' });
        if (!admin) {
            console.log('Admin user missing. Please run main seeder first.');
            process.exit();
        }

        // Wipe cleanly
        await Grade.deleteMany();
        await Attendance.deleteMany();
        await Course.deleteMany();
        await Student.deleteMany();
        await Teacher.deleteMany();
        console.log('Cleaned old Madrasa collections.');

        // 1. Create 5 Teachers
        const teacherData = [];
        for (let i = 1; i <= 5; i++) {
            teacherData.push({
                fullName: `Teacher ${i}`,
                qualification: 'Hafiz',
                specialization: i % 2 === 0 ? 'Tajweed' : 'Arabic',
                assignedCourses: []
            });
        }
        const teachers = await Teacher.insertMany(teacherData);
        console.log('Seeded 5 Teachers.');

        // 2. Create 15 Students
        const studentData = [];
        for (let i = 1; i <= 15; i++) {
            studentData.push({
                fullName: `Student ${i}`,
                age: 10 + (i % 5),
                guardianName: `Guardian ${i}`,
                guardianContact: '123-456-7890',
                enrolledCourses: []
            });
        }
        const students = await Student.insertMany(studentData);
        console.log('Seeded 15 Students.');

        // 3. Create 8 Courses, assigned to teachers
        const coursesData = [];
        for (let i = 0; i < 8; i++) {
            let assignedTeacher = teachers[i % 5];
            coursesData.push({
                name: `Course ${i + 1}`,
                description: 'A mock course for testing relational structures.',
                teacher: assignedTeacher._id,
                schedule: 'Mon/Wed/Fri 5-6 PM',
                duration: '6 Months',
                maxStudents: 10,
                enrolledStudents: []
            });
        }
        const courses = await Course.insertMany(coursesData);
        console.log('Seeded 8 Courses.');

        // 4. Update Teacher records with assigned Courses
        for (let course of courses) {
            await Teacher.findByIdAndUpdate(course.teacher, {
                $push: { assignedCourses: course._id }
            });
        }

        // 5. Enroll Students in Courses (cross-linking)
        // We will assign each student to Course 1 and maybe Course 2.
        const course1 = courses[0];
        const course2 = courses[1];
        const course3 = courses[2]; // Leave empty for other tests
        for (let i = 0; i < students.length; i++) {
            let student = students[i];

            // Enroll all 10 students in course 1 (fills it completely since max is 10)
            if (i < 10) {
                await Course.findByIdAndUpdate(course1._id, { $push: { enrolledStudents: student._id } });
                await Student.findByIdAndUpdate(student._id, { $push: { enrolledCourses: course1._id } });
            }

            // Enroll first 5 in course 2
            if (i < 5) {
                await Course.findByIdAndUpdate(course2._id, { $push: { enrolledStudents: student._id } });
                await Student.findByIdAndUpdate(student._id, { $push: { enrolledCourses: course2._id } });
            }
        }
        console.log('Processed student enrollments.');

        const enrolledStudentsCourse1 = (await Course.findById(course1._id)).enrolledStudents;

        // 6. Generate Dummy Attendance for Course 1
        const today = new Date();
        const attendancePromises = [];
        for (let i = 0; i < 5; i++) { // Past 5 days
            let attendanceDate = new Date(today);
            attendanceDate.setDate(today.getDate() - i);
            attendanceDate.setHours(0, 0, 0, 0);

            for (let studentId of enrolledStudentsCourse1) {
                attendancePromises.push(
                    Attendance.create({
                        student: studentId,
                        course: course1._id,
                        date: attendanceDate,
                        status: Math.random() > 0.1 ? 'present' : 'absent',
                        markedBy: admin._id,
                    })
                );
            }
        }
        await Promise.all(attendancePromises);
        console.log('Generated mock Attendance records.');

        // 7. Generate Dummy Grades
        const gradePromises = [];
        for (let studentId of enrolledStudentsCourse1) {
            let marksObtained = Math.floor(Math.random() * (100 - 50 + 1)) + 50; // Random 50-100

            gradePromises.push(
                Grade.create({
                    student: studentId,
                    course: course1._id,
                    assessmentName: 'Mid-term Exam',
                    marksObtained: marksObtained,
                    totalMarks: 100,
                    grade: marksObtained >= 90 ? 'A' : marksObtained >= 80 ? 'B' : marksObtained >= 70 ? 'C' : 'D',
                    remarks: 'Good effort.',
                    recordedBy: admin._id
                })
            );
        }
        await Promise.all(gradePromises);
        console.log('Generated mock Grade records.');
        console.log('Madrasa DB Seeding entirely complete.');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedMadrasa();
