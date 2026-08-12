import fs from 'fs';

const docs = `
## User & Role Profile Management API

### User Profile endpoints (\`/api/users\`)
- \`GET /me\` (Protected) - Returns logged-in user profile, including roleProfile details. (Passwords stripped)
- \`PUT /me\` (Protected) - Update \`fullName\`, \`phone\`, \`avatar\`.
- \`GET /\` (Admin) - Paginated list of users. Supports \`?role=\`, \`?search=\`, \`?isActive=\`.
- \`GET /:id\` (Admin) - Get user details by ID.
- \`PUT /:id/role\` (Admin) - Update user role. Will safely auto-provision the requisite role-specific profile document (e.g. Volunteer, CommitteeMember, Member).
- \`PATCH /:id/toggle-active\` (Admin) - Soft toggle \`isActive\`.
- \`DELETE /:id\` (Admin) - Hard delete user and their role-specific profiles.

### Member endpoints (\`/api/members\`)
- \`GET /me\` (Member) - Get logged-in member profile (e.g. city, address).
- \`PUT /me\` (Member) - Update member profile details (\`address\`, \`city\`, \`emergencyContact\`).
- \`POST /request-volunteer\` (Member) - Request to become a volunteer (creates pending Volunteer document). Rejects duplicate/existing requests.
- \`GET /\` (Admin/Committee) - Paginated members list. Supports \`?search=\`, \`?membershipStatus=\`.

### Volunteer endpoints (\`/api/volunteers\`)
- \`GET /me\` (Member/Volunteer) - Returns user's Volunteer profile (e.g. skills, status).
- \`PUT /me/skills\` (Volunteer) - Update \`skills\` and \`availability\`.
- \`GET /\` (Admin/Committee) - Get all volunteers. Supports \`?status=\` filter.
- \`PUT /:id/approve\` (Admin) - Approves volunteer request and automatically elevates their \`User.role\` to \`volunteer\`.
- \`PUT /:id/reject\` (Admin) - Rejects request. User retains \`member\` role.

### Committee endpoints (\`/api/committee\`)
- \`GET /me\` (Committee) - Returns user's CommitteeMember profile (designation, permissions).
- \`GET /\` (Admin/Committee) - Get all committee members.
- \`POST /assign\` (Admin) - Assigns user to committee. Creates CommitteeMember document and upgrades \`User.role\` to \`committee\`.
- \`PUT /:id/permissions\` (Admin) - Update granular permissions array.
- \`DELETE /:id\` (Admin) - Remove member from committee. Reverts \`User.role\` back to \`member\`.
`;

fs.appendFileSync('API_DOCS.md', docs);
console.log('Appended to docs');
