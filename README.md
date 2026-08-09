<div align="center">
  <h1>🕌 Faizan E Madina Sunni Masjid</h1>
  <h3>Enterprise-Grade Smart Mosque Management System</h3>
  <p>A comprehensive, full-stack MERN platform designed to digitize and streamline mosque operations, madrasa administration, and community engagement.</p>

  <div>
    <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" />
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" />
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </div>
</div>

---

## 📖 Overview

The **Faizan E Madina Management System** is a modern, scalable web application built to bring traditional mosque administration into the digital age. Moving away from manual ledgers, this platform provides role-based, secure digital environments for the Committee, Volunteers, Instructors, and Community Members. 

From automated prayer countdowns and receipt generation to complex madrasa student tracking, this repository represents a complete enterprise ecosystem for Islamic center management.

## ✨ Key Features

### 🛡️ Secure & Role-Based Workflows
* **Robust Authentication:** JWT-based authentication coupled with OTP verification for enhanced security.
* **Granular RBAC:** Distinct, protected dashboard ecosystems for `Admins`, `Committee Members`, `Volunteers`, and `Regular Members`.

### 🏢 Core Mosque Operations
* **Financial Transparency:** Comprehensive donation tracking with automated PDF receipt generation (PDFKit).
* **Event Management:** Curate and accept registrations for mosque events, seminars, and community gatherings.
* **Prayer Intel:** Real-time, dynamic prayer timings and Jamaat countdown widgets.

### 📚 Madrasa Management Module
* **Academic Tracking:** End-to-end tracking of Madrasa courses, respective teachers, and student enrollments.
* **Certification:** System-generated graduation and participation certificates for students.

### 💻 Developer Experience (DX)
* **Design System Driven:** Features a custom, reusable UI component library built on top of Tailwind CSS for extreme visual consistency.
* **RESTful Architecture:** 19 modular backend mongoose schemas exposed via secure, localized API endpoints.

---

## 🛠️ Technology Stack

**Client Architecture (Frontend):**
- **Core:** React 19, Vite
- **Styling:** Tailwind CSS (Custom Islamic aesthetic tokens)
- **State/Data:** Redux, Axios Interceptors (Silent refresh)

**Server Architecture (Backend):**
- **Core:** Node.js, Express.js
- **Database:** MongoDB (Mongoose Object Modeling)
- **Security:** JSON Web Tokens (JWT), Express-Validator
- **Utilities:** Cloudinary (Asset Storage), PDFKit (Document Generation)

---

## ⚙️ Getting Started

### Prerequisites
* Node.js (v18 or higher)
* MongoDB database instance (Local or Atlas Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kasimshah19/Faizan-E-Madina-Sunni-Masjid.git
   cd Faizan-E-Madina-Sunni-Masjid
   ```

2. **Install all dependencies** (This script installs both client and server packages):
   ```bash
   npm run install:all
   ```

3. **Configure Environment Variables:**
   - Navigate to both `/client` and `/server` directories.
   - Duplicate the `.env.example` files and rename them to `.env`.
   - Populate the required credentials (MongoDB URI, JWT Secrets, etc.).

4. **Boot up the development environment:**
   ```bash
   npm run dev
   ```
   *The server will initialize on `PORT 5000` and the React frontend on `localhost:5173`.*

---

## 🤝 Contribution Structure

This project is actively developed by a specialized team:
- **Backend & System Architecture:** [Kasim Shah (kasimshah19)](https://github.com/kasimshah19)
- **Frontend & UI Engineering:** Ammar Shaikh & Mohammad Sohel

*To contribute, please create a new feature branch from `main`, implement your changes, and submit a detailed Pull Request (PR).*

---

<div align="center">
  <i>"Building for the community, with the community."</i>
</div>
