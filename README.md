# SportNest - Sports Facility Booking Platform (API Server)

![SportNest Backend](https://via.placeholder.com/1200x600.png?text=SportNest+-+Backend+API)

## 📌 Project Overview
The SportNest API Server provides a robust, scalable backend for the SportNest sports facility booking platform. Built with Node.js, Express, and MongoDB, it manages user authentication, facility data, and booking transactions securely and efficiently.

## 🚀 Key Features
- **RESTful API Architecture:** Clean and organized endpoints for clients to interact with.
- **Secure Authentication:** Integrated JWT authentication and role-based access control (Admin vs User).
- **Facility Management:** CRUD operations for sports facilities, managed by administrators.
- **Booking Engine:** Handles booking creation, validation (preventing double-bookings), and tracking.
- **Database Integration:** Utilizes MongoDB with Mongoose ODM for structured, scalable data modeling.
- **Error Handling:** Centralized error processing and standardized API responses.

## 🛠 Technologies Used
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) / [Mongoose](https://mongoosejs.com/)
- **Authentication:** [JWT (JSON Web Tokens)](https://jwt.io/) & [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- **Environment Management:** [dotenv](https://www.npmjs.com/package/dotenv)

## 📦 NPM Packages Used
| Package | Version | Purpose |
|---------|---------|---------|
| `express` | `^4.19.2` | Web server framework |
| `mongoose` | `^8.3.1` | MongoDB Object Data Modeling (ODM) |
| `mongodb` | `^7.2.0` | Native MongoDB driver |
| `bcryptjs` | `^2.4.3` | Password hashing |
| `cors` | `^2.8.5` | Cross-Origin Resource Sharing middleware |
| `cookie-parser`| `^1.4.6` | Parse HTTP request cookies |
| `dotenv` | `^16.4.5` | Environment variable loader |
| `nodemon` | `^3.1.0` | Development server auto-reloader |

## ⚙️ Installation Guide

1. **Clone the repository:**
   ```bash
   git clone https://github.com/masudranamdra/SportNest-Server.git
   cd SportNest-Server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the `.env.example` file to `.env` and fill in your variables.
   ```bash
   cp .env.example .env
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The server will start on [http://localhost:5000](http://localhost:5000) (or your configured port).

## 🔐 Environment Variables
Create a `.env` file in the root directory:

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | The port the server runs on (default: `5000`) | No |
| `NODE_ENV` | Environment type (`development`, `production`) | No |
| `MONGODB_URI`| Connection string for MongoDB Atlas/Local | Yes |
| `JWT_SECRET` | Secret key used for signing JWTs | Yes |
| `CLIENT_URL` | Allowed origin for CORS (e.g., frontend URL) | Yes |

## 🌐 API Documentation
*Base URL: `/api`*

| Endpoint | Method | Description | Auth Required | Role |
|----------|--------|-------------|---------------|------|
| `/api/auth/register` | `POST` | Register a new user | No | Any |
| `/api/auth/login` | `POST` | Authenticate user & get token | No | Any |
| `/api/facilities` | `GET` | Get all facilities | No | Any |
| `/api/facilities/:id` | `GET` | Get single facility details | No | Any |
| `/api/facilities` | `POST` | Create a new facility | Yes | Admin |
| `/api/bookings` | `POST` | Create a booking | Yes | User |
| `/api/bookings/user` | `GET` | Get current user's bookings | Yes | User |

## 🚀 Deployment Instructions
This Node.js application is ready for deployment on platforms like Render, Railway, or Heroku.
1. Push your code to a GitHub repository.
2. Connect the repository to your chosen platform (e.g., Render Web Service).
3. Set the start command to `npm start` (which runs `node server.js`).
4. Add all required environment variables from your `.env` file into the platform's deployment settings.
5. Deploy the service.

## 📁 Folder Structure
```text
SportNest-Server/
├── config/           # Database and application configuration files
├── controllers/      # Request handlers for routes (Auth, Booking, Facility)
├── middleware/       # Custom middleware (Auth guarding, Error handling)
├── models/           # Mongoose schemas (User, Facility, Booking)
├── routes/           # Express route definitions
├── scripts/          # Database migration/seed scripts
├── .env.example      # Environment variables template
├── package.json      # Dependencies and scripts
└── server.js         # Application entry point
```

## 🛡️ Security Notes
- **Never commit `.env` files.**
- Passwords are automatically hashed via `bcryptjs` before being saved to the database.
- Protected routes require a valid JWT passed in the `Authorization` header as a Bearer token.
- CORS is configured to only accept requests from the specified `CLIENT_URL`.

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Author
**Masud Rana**
- GitHub: [@masudranamdra](https://github.com/masudranamdra)
- Email: [masud.dev01@gmail.com](mailto:masud.dev01@gmail.com)
