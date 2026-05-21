require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

// Initialize DB connection for serverless environments
// This will reuse existing connections automatically through Mongoose pooling
connectDB();

const app = express();
app.set('trust proxy', 1);

// CORS configuration for Vercel deployment
// Accepts frontend URL from environment, defaults to localhost for development
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const apiLimiter = (() => {
  const hits = new Map();
  const windowMs = 15 * 60 * 1000;
  const max = Number(process.env.RATE_LIMIT_MAX || 300);

  return (req, res, next) => {
    const now = Date.now();
    const key = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    const record = hits.get(key) || { count: 0, resetAt: now + windowMs };

    if (record.resetAt <= now) {
      record.count = 0;
      record.resetAt = now + windowMs;
    }

    record.count += 1;
    hits.set(key, record);

    if (record.count > max) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.',
      });
    }

    next();
  };
})();

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

app.use(apiLimiter);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  const clearOptions = {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  };

  ['next-auth.session-token', '__Secure-next-auth.session-token', 'next-auth.csrf-token', '__Host-next-auth.csrf-token'].forEach((name) => {
    if (req.cookies?.[name]) res.clearCookie(name, clearOptions);
  });

  next();
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/facilities', require('./routes/facilityRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Root Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'SportNest API Server is running smoothly!',
    timestamp: new Date(),
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

app.use(errorHandler);

// Export app for Vercel serverless functions
module.exports = app;

// Only listen to port in local development mode
// Vercel automatically handles the server startup for serverless functions
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });

  process.on('unhandledRejection', (error) => {
    console.error(`Unhandled rejection: ${error.message}`);
    server.close(() => process.exit(1));
  });
}
