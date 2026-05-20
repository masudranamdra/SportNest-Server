# SportNest - Sports Facility Booking Platform (Server)

## Project Overview

SportNest Server is the backend API server for the SportNest sports facility booking platform. It manages authentication, facilities, bookings, and database operations using Node.js, Express.js, and MongoDB.

This project was developed to practice and demonstrate backend development concepts learned during coursework, including REST API creation, CRUD operations, authentication, database integration, middleware, and server deployment.

---

## Live Server URL

Server Live Link:

https://sportnest-mdra.onrender.com

---

## Main Features

- REST API Development
- User Authentication System
- Google Authentication Support
- Facility Management System
- Booking Management System
- CRUD Operations
- MongoDB Database Integration
- Protected API Routes
- Middleware Implementation
- Error Handling System
- Environment Variable Security
- CORS Configuration

---

## Technologies Used

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication
- Better Auth
- Google OAuth

### Deployment
- Render

---

## NPM Packages Used

| Package Name | Purpose |
|--------------|---------|
| express | Backend Framework |
| mongodb | MongoDB Database Driver |
| mongoose | MongoDB ODM |
| cors | Cross-Origin Resource Sharing |
| dotenv | Environment Variables |
| cookie-parser | Cookie Handling |
| nodemon | Development Server |
| better-auth | Authentication System |

---

## Installation Process

### Clone Repository

```bash
git clone https://github.com/masudranamdra/SportNest-Server.git
```

### Move to Project Folder

```bash
cd SportNest-Server
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

---

## Environment Variables

Create a `.env` file and add the following variables:

```env
PORT=
MONGODB_URI=
CLIENT_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
```

---

## API Endpoints

### Authentication Routes

```bash
POST /api/auth/sign-in
POST /api/auth/sign-up
GET  /api/auth/get-session
```

### Facility Routes

```bash
GET    /api/facilities
GET    /api/facilities/:id
POST   /api/facilities
PUT    /api/facilities/:id
DELETE /api/facilities/:id
```

### Booking Routes

```bash
GET    /api/bookings
POST   /api/bookings
DELETE /api/bookings/:id
```

---

## Project Structure

```bash
SportNest-Server/
│
├── config/
│
├── controllers/
│
├── middleware/
│
├── models/
│
├── routes/
│
├── utils/
│
├── services/
│
├── database/
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

---

## Security Features

- Protected API Routes
- Environment Variable Protection
- Authentication Middleware
- CORS Security Configuration
- Cookie-Based Session Handling

---

## Developer Information

Name: Masud Rana

GitHub:
https://github.com/masudranamdra

Email:
masud.dev01@gmail.com

---

## License

This project is created for educational and learning purposes only.
