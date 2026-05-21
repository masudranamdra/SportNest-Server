const mongoose = require('mongoose');

// Track connection state to prevent multiple connect attempts in serverless
let isConnecting = false;

const connectDB = async () => {
  // Prevent multiple connection attempts in serverless environments
  if (mongoose.connection.readyState === 1) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('MongoDB already connected, reusing existing connection');
    }
    return;
  }

  // Prevent simultaneous connection attempts
  if (isConnecting) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('MongoDB connection already in progress, waiting...');
    }
    return;
  }

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not configured');
    }

    isConnecting = true;

    mongoose.connection.on('disconnected', () => {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('MongoDB disconnected. Mongoose will attempt to reconnect.');
      }
    });

    mongoose.connection.on('error', (error) => {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`MongoDB runtime error: ${error.message}`);
      }
    });

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: Number(process.env.MONGODB_MAX_POOL_SIZE || 10),
    });

    isConnecting = false;

    if (process.env.NODE_ENV !== 'production') {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
  } catch (error) {
    isConnecting = false;
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
