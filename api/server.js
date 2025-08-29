// api/server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';

const app = express();

// Core middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

// Health
app.get('/api/health', (req, res) => res.json({ ok: true }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// 404 handler (must be after routes)
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handler (must have 4 args, placed last)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Internal Server Error' });
});

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }

  // Optional: connection event listeners
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB runtime error:', err);
  });

  app.listen(process.env.PORT || 4000, () => {
    console.log('API running on', process.env.PORT || 4000);
  });
};

start();
