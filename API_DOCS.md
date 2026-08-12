# 🕌 Prayer Timings API Documentation

Base URL: `/api/prayers`

All protected routes require a JWT bearer token for a user with the `admin` or `superadmin` role.

---

## 1. Get Today's Prayer Timings
Fetches the prayer timings for the current date based on the server's local timezone. If no exact match is found for today, it falls back to the most recently updated schedule (useful so the UI doesn't break if the admin forgets to update the exact date).

- **URL:** `/api/prayers/today`
- **Method:** `GET`
- **Auth Required:** No
- **Query Params:** None

**Success Response:**
```json
{
  "success": true,
  "data": {
    "fajr": "04:30",
    "sunrise": "05:45",
    "zuhr": "13:00",
    "asr": "16:45",
    "maghrib": "19:15",
    "isha": "20:45",
    "jummah": "13:30",
    "hijriDate": "15 Safar 1446",
    "date": "2026-08-09T00:00:00.000Z",
    "isToday": true
  }
}
```

*(Note: If `isToday: false`, it means the fallback data was used. The frontend can decide to hide the date or show an "approximate" warning).*

---

## 2. Get All Prayer Timings
Fetches a paginated list of historical and upcoming prayer timings. Can be filtered by month and year to build a calendar view.

- **URL:** `/api/prayers`
- **Method:** `GET`
- **Auth Required:** No
- **Query Params:** 
  - `page` (optional, default: 1)
  - `limit` (optional, default: 30)
  - `month` (optional, 1-12)
  - `year` (optional, e.g., 2026)

**Success Response:**
```json
{
  "success": true,
  "count": 30,
  "total": 365,
  "currentPage": 1,
  "totalPages": 13,
  "data": [
    {
      "fajr": "04:30",
      "sunrise": "...",
      /* ... */
    }
  ]
}
```

---

## 3. Create or Update Prayer Timings (Upsert)
Updates the prayer timings for a specific provided date. If no document exists for that date, one is created.

- **URL:** `/api/prayers/update`
- **Method:** `PUT`
- **Auth Required:** Yes (`admin` or `superadmin` role)
- **Data Body:**
```json
{
  "date": "2026-08-09T00:00:00.000Z",
  "fajr": "04:30",
  "sunrise": "05:50",
  "zuhr": "13:00",
  "asr": "16:45",
  "maghrib": "19:10",
  "isha": "20:30",
  "jummah": "13:30",
  "hijriDate": "25 Dhu'l Qadah 1445"
}
```
*(All time values MUST be in 24-hour `HH:MM` format).*

**Success Response:**
```json
{
  "success": true,
  "message": "Prayer times updated successfully",
  "data": { /* Updated Document */ }
}
```

**Validation Error Response (400):**
```json
{
  "success": false,
  "message": "Validation Failed",
  "errors": {
    "fajr": "Fajr: Must be in HH:MM format (24-hour)"
  }
}
```

---

## 4. Delete Prayer Timings
Deletes a specific schedule from the database using its unique `_id`.

- **URL:** `/api/prayers/:id`
- **Method:** `DELETE`
- **Auth Required:** Yes (`admin` or `superadmin` role)

**Success Response:**
```json
{
  "success": true,
  "message": "Prayer timing removed successfully"
}
```

---

# 📅 Events & RSVP API Documentation

Base URL: `/api/events`

---

## 1. Create Event
- **URL:** `/api/events`
- **Method:** `POST`
- **Auth Required:** Yes (`admin`, `committee`)
- **Body:**
```json
{
  "title": "Weekly Tafseer",
  "category": "islamic_lecture",
  "date": "2026-08-15T00:00:00.000Z",
  "location": "Main Hall",
  "maxAttendees": 50,
  "isRegistrationRequired": true
}
```
**Success Response:** 201 Created

---

## 2. Get All Events
- **URL:** `/api/events`
- **Method:** `GET`
- **Auth Required:** No
- **Query Params:** `category`, `status`, `upcoming`, `page`, `limit`
**Success Response:** 200 OK
Includes dynamically computed `spotsRemaining` for each event if `maxAttendees` is set.

---

## 3. Get Single Event
- **URL:** `/api/events/:id`
- **Method:** `GET`
- **Auth Required:** No
**Success Response:** 200 OK (includes `spotsRemaining`)

---

## 4. Update Event
- **URL:** `/api/events/:id`
- **Method:** `PUT`
- **Auth Required:** Yes (`admin`, `committee` - ownership verified)
**Success Response:** 200 OK

---

## 5. Delete Event
- **URL:** `/api/events/:id`
- **Method:** `DELETE`
- **Auth Required:** Yes (`admin` only)
**Success Response:** 200 OK (Registration documents also cascade-deleted)

---

## 6. RSVP To Event
- **URL:** `/api/events/:id/rsvp`
- **Method:** `POST`
- **Auth Required:** Yes (Any authenticated user)
**Success Response:** 201 Created (400 if event is full, already registered, or registration not required).

---

## 7. Cancel RSVP
- **URL:** `/api/events/:id/rsvp`
- **Method:** `DELETE`
- **Auth Required:** Yes (Any authenticated user)
**Success Response:** 200 OK

---

## 8. Get Event Registrations
- **URL:** `/api/events/:id/registrations`
- **Method:** `GET`
- **Auth Required:** Yes (`admin`, `committee` - ownership verified)
**Success Response:** 200 OK

---

## 9. Get My RSVPs
- **URL:** `/api/events/my-rsvps`
- **Method:** `GET`
- **Auth Required:** Yes (Any authenticated user)
**Success Response:** 200 OK

---

# 📢 Announcements API Documentation

Base URL: `/api/announcements`

---

## 1. Create Announcement
- **URL:** `/api/announcements`
- **Method:** `POST`
- **Auth Required:** Yes (`admin`, `committee`)
- **Body:**
```json
{
  "title": "Summer Program Starting Soon",
  "content": "Sign up for the summer Madrasa before spots fill up.",
  "priority": "high",
  "isPinned": true,
  "expiresAt": "2026-09-01T00:00:00.000Z"
}
```
**Success Response:** 201 Created

---

## 2. Get All Active Announcements (Public)
- **URL:** `/api/announcements`
- **Method:** `GET`
- **Auth Required:** No
- **Query Params:** `priority`, `page`, `limit`
**Success Response:** 200 OK
*Note: Returns ONLY active announcements that have not expired. Results are strictly sorted with `isPinned: true` at the top.*

---

## 3. Get All Announcements (Admin)
- **URL:** `/api/announcements/admin/all`
- **Method:** `GET`
- **Auth Required:** Yes (`admin`, `committee`)
- **Query Params:** `page`, `limit`
**Success Response:** 200 OK
*Note: Returns ALL announcements regardless of active/expired status for management purposes.*

---

## 4. Get Single Announcement
- **URL:** `/api/announcements/:id`
- **Method:** `GET`
- **Auth Required:** No
**Success Response:** 200 OK

---

## 5. Update Announcement
- **URL:** `/api/announcements/:id`
- **Method:** `PUT`
- **Auth Required:** Yes (`admin`, `committee` - ownership verified for committee members)
**Success Response:** 200 OK

---

## 6. Delete Announcement
- **URL:** `/api/announcements/:id`
- **Method:** `DELETE`
- **Auth Required:** Yes (`admin` only)
**Success Response:** 200 OK (Hard deleted).

---

## 7. Toggle Announcement Active Status
- **URL:** `/api/announcements/:id/toggle-active`
- **Method:** `PATCH`
- **Auth Required:** Yes (`admin`, `committee` - ownership verified)
**Success Response:** 200 OK (Switches `isActive` true/false immediately without needing a full PUT request).

---

# 🎓 Madrasa Administration API Documentation

This module encompasses 6 highly relational sub-modules managing the Madrasa system.

## A. Students (`/api/students`)
- **GET `/api/students`** (Auth: `admin`, `committee`, `teacher`): Get paginated list. Filter by `status`, search by `fullName`.
- **GET `/api/students/:id`** (Auth: Above roles, or the student themselves): Includes `enrolledCourses` explicitly mapping course name and teacher name.
- **POST `/api/students`** (Auth: `admin`, `committee`): Create a student.
- **PUT `/api/students/:id`** (Auth: `admin`, `committee`): Edit a student.
- **DELETE `/api/students/:id`** (Auth: `admin` only): Hard deletes student and securely cascades removal from assigned `Course.enrolledStudents` arrays.

## B. Teachers (`/api/teachers`)
- **GET `/api/teachers`** (Public): Paginated list. Includes array mapping of `assignedCourses`.
- **GET `/api/teachers/:id`** (Public): Single teacher details.
- **POST `/api/teachers`** (Auth: `admin`): Create teacher.
- **PUT `/api/teachers/:id`** (Auth: `admin`): Update teacher info.
- **DELETE `/api/teachers/:id`** (Auth: `admin`): Deletion hard-blocked (400 Error) natively if teacher has active courses assigned, forcing rigorous data integrity.

## C. Courses (`/api/courses`)
- **GET `/api/courses`** (Public): Returns paginated courses, hides private student data but includes an aggregated `enrolledCount`.
- **GET `/api/courses/:id`** (Public): Single course.
- **POST `/api/courses`** (Auth: `admin`, `committee`): Creates course and symmetrically injects it into teacher's `assignedCourses` array.
- **PUT `/api/courses/:id`** (Auth: `admin`, `committee`): Standard edit. If changing teachers, updates reference mappings defensively on old and new teacher accounts.
- **DELETE `/api/courses/:id`** (Auth: `admin`): Hard deletions cascade safely clearing references on associated Teacher and Enrolled Students arrays.

## D. Enrollments (`/api/enrollments`)
- **POST `/api/enrollments`** (Auth: `admin`, `committee`): Enrolls a student iteratively processing two-sided relationship binding (`Course.enrolledStudents` and `Student.enrolledCourses`). Returns `400 Course is full` if `maxStudents` is overridden.
- **DELETE `/api/enrollments`** (Auth: `admin`, `committee`): Cleanly unenrolls a student by popping symmetrical records without deleting historical logs.

## E. Attendance (`/api/attendance`)
- **POST `/api/attendance`** (Auth: `admin`, `committee`, `teacher`): Mark or upsert a single student’s attendance record cleanly (preventing Mongo DB duplicate keys).
- **POST `/api/attendance/bulk`** (Auth: `admin`, `committee`, `teacher`): Bulk-mark daily course attendance processing efficient upsert promises loops.
- **GET `/api/attendance/student/:id`** (Auth: Staff or Student themselves): Returns a `summary` aggregate payload computing precise percentages (`totalClasses`, `presentCount`, `absentCount`).
- **GET `/api/attendance/course/:id`** (Auth: Staff): Returns total course attendance metrics mapping.

## F. Grading (`/api/grades`)
- **POST `/api/grades`** (Auth: `admin`, `committee`, `teacher`): Record a grade. Server automatically converts `marksObtained` dynamically to a Letter Code Scale (A >=90, B >= 80, C >= 70...).
- **GET `/api/grades/student/:id`** (Auth: Staff or Student): Aggregates history and returns a cumulative `overallPercentage` metric.
- **PUT `/api/grades/:id`** (Auth: Staff): Update score (recalculates grade), restricted to the original Teacher recorder or Admins via deep ownership hooks.
- **DELETE `/api/grades/:id`** (Auth: Staff): Standard restricted delete.

---

# 🖼️ Gallery API Documentation

Base URL: `/api/gallery`

> **Note:** The `POST /api/gallery` endpoint requires `multipart/form-data` (not JSON). The file must be sent under the field name `media`.

---

## 1. Upload Gallery Item
- **URL:** `/api/gallery`
- **Method:** `POST`
- **Auth Required:** Yes (`admin`, `committee`)
- **Content-Type:** `multipart/form-data`
- **Body Fields:**
  - `media` (file, required): Image (JPG/PNG/WEBP) or Video (MP4/MOV), max 50MB
  - `title` (string, required): Min 2 characters
  - `description` (string, optional)
  - `album` (string, optional): Album name for grouping
  - `category` (string, optional): One of `events`, `mosque`, `madrasa`, `community`, `other`
  - `tags` (string, optional): Comma-separated tags, e.g. `"prayer,ramadan,community"`

**Success Response:** 201 Created
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "Friday Prayer",
    "mediaType": "image",
    "mediaUrl": "https://res.cloudinary.com/.../gallery/abc123.jpg",
    "cloudinaryPublicId": "faizan-e-madina/gallery/abc123",
    "category": "events",
    "tags": ["prayer", "ramadan"],
    "uploadedBy": "userId",
    "createdAt": "..."
  }
}
```

---

## 2. Get All Gallery Items (Public)
- **URL:** `/api/gallery`
- **Method:** `GET`
- **Auth Required:** No
- **Query Params:**
  - `page` (default: 1), `limit` (default: 20)
  - `category` — filter by category enum
  - `album` — filter by album name
  - `mediaType` — `image` or `video`
  - `search` — matches title or tags (case-insensitive)

**Success Response:** 200 OK (paginated list)

---

## 3. Get Albums (Public)
- **URL:** `/api/gallery/albums`
- **Method:** `GET`
- **Auth Required:** No

**Success Response:** 200 OK
```json
{
  "success": true,
  "count": 3,
  "data": [
    { "album": "Masjid Photos", "count": 4, "latestImage": "https://..." },
    { "album": "Events", "count": 3, "latestImage": "https://..." }
  ]
}
```

---

## 4. Get Single Gallery Item (Public)
- **URL:** `/api/gallery/:id`
- **Method:** `GET`
- **Auth Required:** No

**Success Response:** 200 OK

---

## 5. Update Gallery Item (Metadata Only)
- **URL:** `/api/gallery/:id`
- **Method:** `PUT`
- **Auth Required:** Yes (`admin`, `committee` — committee can only edit own uploads)
- **Body (JSON):** `title`, `description`, `album`, `category`, `tags`

**Success Response:** 200 OK
*Note: Does NOT replace the uploaded media file. To change media, delete and re-upload.*

---

## 6. Delete Gallery Item
- **URL:** `/api/gallery/:id`
- **Method:** `DELETE`
- **Auth Required:** Yes (`admin`, `committee` — committee can only delete own uploads)

---

# 📄 Documents & Notices API Documentation

Base URL: `/api/documents`

> **Note:** The `POST /api/documents` endpoint requires `multipart/form-data` (not JSON). The file must be sent under the field name `document` (strictly PDFs only), max limit 15MB.

---

## 1. Upload Document
- **URL:** `/api/documents`
- **Method:** `POST`
- **Auth Required:** Yes (`admin`, `committee`)
- **Content-Type:** `multipart/form-data`
- **Body Fields:**
  - `document` (file, required): strictly `.pdf`
  - `title` (string, required): Min 2 characters
  - `category` (string, required): One of `annual_report`, `notice`, `circular`, `policy`, `other`
  - `description` (string, optional)
  - `isPublic` (boolean, optional, default: true): Set to `false` for internal admin documents.

**Success Response:** 201 Created

---

## 2. Get All Public Documents
- **URL:** `/api/documents`
- **Method:** `GET`
- **Auth Required:** No
- **Query Params:** `page`, `limit`, `category`, `search`
- **Note:** Strict filter applied; ONLY returns items where `isPublic` is `true`.

**Success Response:** 200 OK (paginated list sorted by `publishDate` descending)

---

## 3. Get All Documents (Admin)
- **URL:** `/api/documents/admin/all`
- **Method:** `GET`
- **Auth Required:** Yes (`admin`, `committee`)
- **Note:** Returns ALL documents (both public and private) for management dashboard.

**Success Response:** 200 OK (paginated list)

---

## 4. Get Single Document Details
- **URL:** `/api/documents/:id`
- **Method:** `GET`
- **Auth Required:** Optional
- **Note:** Checks visibility. If document is private (`isPublic: false`), it will deliberately return a `404 Not Found` to guests/members, to mask its existence. Admin/Committee bypassing the check will receive the document.

**Success Response:** 200 OK
**Failure Response (Hidden):** 404 Not Found

---

## 5. Download Document (File Delivery)
- **URL:** `/api/documents/:id/download`
- **Method:** `GET`
- **Auth Required:** Optional (Subject to same `isPublic` checks as above)
- **Note:** This endpoint increments the `downloadCount` analytic metric by 1, and then performs an HTTP `302 Redirect` to direct the browser to fetch the raw PDF from Cloudinary URL safely.

**Success Response:** 302 Redirect
**Failure Response (Hidden):** 404 Not Found

---

## 6. Update Document (Metadata Only)
- **URL:** `/api/documents/:id`
- **Method:** `PUT`
- **Auth Required:** Yes (`admin`, `committee` — committee can only edit own uploads)
- **Body (JSON):** `title`, `description`, `category`, `isPublic`
- **Note:** Does NOT replace the uploaded PDF file. To change media, delete and re-upload.

**Success Response:** 200 OK

---

## 7. Delete Document
- **URL:** `/api/documents/:id`
- **Method:** `DELETE`
- **Auth Required:** Yes (`admin`, `committee` — committee can only delete own uploads)
- **Note:** Deletes the physical `raw` PDF asset inside Cloudinary `faizan-e-madina/documents` folder, then deletes the MongoDB record.

**Success Response:** 200 OK


## User & Role Profile Management API

### User Profile endpoints (`/api/users`)
- `GET /me` (Protected) - Returns logged-in user profile, including roleProfile details. (Passwords stripped)
- `PUT /me` (Protected) - Update `fullName`, `phone`, `avatar`.
- `GET /` (Admin) - Paginated list of users. Supports `?role=`, `?search=`, `?isActive=`.
- `GET /:id` (Admin) - Get user details by ID.
- `PUT /:id/role` (Admin) - Update user role. Will safely auto-provision the requisite role-specific profile document (e.g. Volunteer, CommitteeMember, Member).
- `PATCH /:id/toggle-active` (Admin) - Soft toggle `isActive`.
- `DELETE /:id` (Admin) - Hard delete user and their role-specific profiles.

### Member endpoints (`/api/members`)
- `GET /me` (Member) - Get logged-in member profile (e.g. city, address).
- `PUT /me` (Member) - Update member profile details (`address`, `city`, `emergencyContact`).
- `POST /request-volunteer` (Member) - Request to become a volunteer (creates pending Volunteer document). Rejects duplicate/existing requests.
- `GET /` (Admin/Committee) - Paginated members list. Supports `?search=`, `?membershipStatus=`.

### Volunteer endpoints (`/api/volunteers`)
- `GET /me` (Member/Volunteer) - Returns user's Volunteer profile (e.g. skills, status).
- `PUT /me/skills` (Volunteer) - Update `skills` and `availability`.
- `GET /` (Admin/Committee) - Get all volunteers. Supports `?status=` filter.
- `PUT /:id/approve` (Admin) - Approves volunteer request and automatically elevates their `User.role` to `volunteer`.
- `PUT /:id/reject` (Admin) - Rejects request. User retains `member` role.

### Committee endpoints (`/api/committee`)
- `GET /me` (Committee) - Returns user's CommitteeMember profile (designation, permissions).
- `GET /` (Admin/Committee) - Get all committee members.
- `POST /assign` (Admin) - Assigns user to committee. Creates CommitteeMember document and upgrades `User.role` to `committee`.
- `PUT /:id/permissions` (Admin) - Update granular permissions array.
- `DELETE /:id` (Admin) - Remove member from committee. Reverts `User.role` back to `member`.
