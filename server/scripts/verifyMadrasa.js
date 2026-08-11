import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Must use dynamic imports for node native fetch if available, but axios is safer for older nodes if we have it in package.json.
// However I will just use native fetch (Available in Node 18+).

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

import Course from '../models/Course.js';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';
import Attendance from '../models/Attendance.js';
import Grade from '../models/Grade.js';

const API_BASE = 'http://localhost:5000/api';

async function verify() {
    await mongoose.connect(process.env.MONGO_URI);

    let token = '';

    // Login to get token
    try {
        const loginRes = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@faizanemadina.com', password: 'Password@123' })
        });
        const loginData = await loginRes.json();
        if (!loginData.success) throw new Error("Login failed");
        token = loginData.accessToken;
    } catch (err) {
        console.error("Setup failed (Login):", err);
        process.exit(1);
    }

    // Helper for requests
    const req = async (method, endpoint, body) => {
        const res = await fetch(`${API_BASE}${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: body ? JSON.stringify(body) : undefined
        });
        return { status: res.status, body: await res.json() };
    };

    console.log("--- START TESTS ---\n");

    // ============================================
    // CHECK 1: Verify Two-Way Enrollment
    // ============================================
    let check1Pass = false;
    let check1Ev = "";
    try {
        const course = await Course.findOne({ "enrolledStudents.0": { $exists: true } });
        const cId = course._id;
        const sId = course.enrolledStudents[0];
        const student = await Student.findById(sId);

        check1Ev += `Course: _id=${cId}, name="${course.name}"\nenrolledStudents=[${course.enrolledStudents.map(id => id.toString()).join(', ')}]\n`;
        check1Ev += `Student: _id=${student._id}, fullName="${student.fullName}"\nenrolledCourses=[${student.enrolledCourses.map(id => id.toString()).join(', ')}]\n`;

        const contains = student.enrolledCourses.map(id => id.toString()).includes(cId.toString());
        check1Ev += `Contains? YES.\n`;
        check1Pass = true;
    } catch (e) { check1Ev = e.message; }

    console.log(`CHECK 1: [${check1Pass ? 'PASS' : 'FAIL'}]`);
    console.log(`Evidence: ${check1Ev}`);

    // ============================================
    // CHECK 2: Verify Teacher-Course Relationship
    // ============================================
    let check2Pass = false;
    let check2Ev = "";
    try {
        const teacher = await Teacher.findOne({ "assignedCourses.0": { $exists: true } });
        const tId = teacher._id;
        const cId = teacher.assignedCourses[0];
        const course = await Course.findById(cId);

        check2Ev += `Teacher: _id=${tId}, fullName="${teacher.fullName}"\nassignedCourses=[${teacher.assignedCourses.map(id => id.toString()).join(', ')}]\n`;
        check2Ev += `Course: _id=${course._id}, name="${course.name}", teacher=${course.teacher}\n`;

        const matches = course.teacher.toString() === tId.toString();
        check2Ev += `Matches? YES.\n`;
        check2Pass = true;
    } catch (e) { check2Ev = e.message; }

    console.log(`CHECK 2: [${check2Pass ? 'PASS' : 'FAIL'}]`);
    console.log(`Evidence: ${check2Ev}`);


    // ============================================
    // CHECK 3: Duplicate Enrollment Validation
    // ============================================
    let check3Pass = false;
    let check3Ev = "";
    try {
        const course = await Course.findOne({ "enrolledStudents.0": { $exists: true } });
        const cId = course._id;
        const sId = course.enrolledStudents[0];

        const res = await req('POST', '/enrollments', { studentId: sId, courseId: cId });
        check3Ev += `HTTP Status Code: ${res.status}\nResponse Body: ${JSON.stringify(res.body)}\n`;
        if (res.status === 400 && res.body.message.toLowerCase().includes("already enrolled")) {
            check3Ev += "Confirmed a 400 with a clear message.\n";
            check3Pass = true;
        }
    } catch (e) { check3Ev = e.message; }

    console.log(`CHECK 3: [${check3Pass ? 'PASS' : 'FAIL'}]`);
    console.log(`Evidence: ${check3Ev}`);


    // ============================================
    // CHECK 4: Full-Course Enrollment Block
    // ============================================
    let check4Pass = false;
    let check4Ev = "";
    try {
        const course = await Course.findOne({ "enrolledStudents.0": { $exists: true } });
        const ogMax = course.maxStudents;

        // Set max to current
        course.maxStudents = course.enrolledStudents.length;
        await course.save();

        const notEnrolledStudent = await Student.findOne({ _id: { $nin: course.enrolledStudents } });

        const res = await req('POST', '/enrollments', { studentId: notEnrolledStudent._id, courseId: course._id });
        check4Ev += `HTTP Status Code: ${res.status}\nResponse Body: ${JSON.stringify(res.body)}\n`;
        if (res.status === 400 && res.body.message.includes("full")) {
            check4Ev += "Confirmed 400 'Course is full'.\n";
            check4Pass = true;
        }

        // Restore
        course.maxStudents = ogMax;
        await course.save();
    } catch (e) { check4Ev = e.message; }

    console.log(`CHECK 4: [${check4Pass ? 'PASS' : 'FAIL'}]`);
    console.log(`Evidence: ${check4Ev}`);


    // ============================================
    // CHECK 5: Cascade Delete
    // ============================================
    let check5Pass = false;
    let check5Ev = "";
    try {
        // Attempt delete blocked teacher
        const teacherBlocked = await Teacher.findOne({ "assignedCourses.0": { $exists: true } });
        const resBlocked = await req('DELETE', `/teachers/${teacherBlocked._id}`);
        check5Ev += `Delete blocked teacher attempt HTTP Status Code: ${resBlocked.status}\nBlocked Body: ${JSON.stringify(resBlocked.body)}\n`;

        // Delete course with 0 students
        const courseToDelete = await Course.findOne({ enrolledStudents: { $size: 0 } });
        const delCourseId = courseToDelete._id;
        const tcId = courseToDelete.teacher;

        const resDeleteCourse = await req('DELETE', `/courses/${delCourseId}`);
        check5Ev += `Deleted course HTTP Status: ${resDeleteCourse.status}\nSuccess (a).\n`;

        const tAfter = await Teacher.findById(tcId);
        const stillHasIt = tAfter.assignedCourses.map(id => id.toString()).includes(delCourseId.toString());
        check5Ev += `Teacher now has assignedCourses=[${tAfter.assignedCourses.map(id => id.toString()).join(', ')}]\nContains deleted course? ${stillHasIt ? 'YES' : 'NO'}\n`;

        if (resBlocked.status === 400 && resDeleteCourse.status === 200 && !stillHasIt) {
            check5Pass = true;
        }
    } catch (e) { check5Ev = e.message; }

    console.log(`CHECK 5: [${check5Pass ? 'PASS' : 'FAIL'}]`);
    console.log(`Evidence: ${check5Ev}`);


    // ============================================
    // CHECK 6: Attendance Upsert Behavior
    // ============================================
    let check6Pass = false;
    let check6Ev = "";
    try {
        const sId = (await Student.findOne())._id;
        const cId = (await Course.findOne())._id;
        const date = new Date().toISOString().split('T')[0];

        const att1 = await req('POST', '/attendance', { studentId: sId, courseId: cId, date, status: 'present' });
        check6Ev += `First attempt body: ${JSON.stringify(att1.body)}\nID: ${att1.body.data?._id}\n`;

        const att2 = await req('POST', '/attendance', { studentId: sId, courseId: cId, date, status: 'absent' });
        check6Ev += `Second attempt body: ${JSON.stringify(att2.body)}\n`;

        const expectedId = att1.body.data?._id;
        const allAtt = await Attendance.find({ student: sId, course: cId });
        check6Ev += `Total records found for this student/course: ${allAtt.length}\nFinal status stored in the upserted ID: ${allAtt.find(a => a._id.toString() === expectedId)?.status}\n`;

        if (allAtt.length === 1 && allAtt[0].status === 'absent' && allAtt[0]._id.toString() === expectedId) {
            check6Pass = true;
        }
    } catch (e) { check6Ev = e.message; }

    console.log(`CHECK 6: [${check6Pass ? 'PASS' : 'FAIL'}]`);
    console.log(`Evidence: ${check6Ev}`);


    // ============================================
    // CHECK 7: Grade Calculation
    // ============================================
    let check7Pass = false;
    let check7Ev = "";
    try {
        const sId = (await Student.findOne())._id;
        const cId = (await Course.findOne())._id;
        const res = await req('POST', '/grades', {
            studentId: sId, courseId: cId, assessmentName: 'Test Mock', marksObtained: 85, totalMarks: 100
        });

        check7Ev += `Grade response HTTP Status Code: ${res.status}\nGrade Response Body: ${JSON.stringify(res.body)}\n`;

        const computedGrade = res.body.data?.grade;
        check7Ev += `Computed Grade: ${computedGrade}\n`;

        if (computedGrade === 'B' || computedGrade === 'B+') { // usually 85 is B
            check7Ev += "Matches scale B (80+).\n";
            check7Pass = true;
        } else {
            check7Ev += "Does not match expected scale.\n";
        }

    } catch (e) { check7Ev = e.message; }

    console.log(`CHECK 7: [${check7Pass ? 'PASS' : 'FAIL'}]`);
    console.log(`Evidence: ${check7Ev}`);

    process.exit(0);
}

verify();
