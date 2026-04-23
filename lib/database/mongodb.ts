'use server';

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('MongoDB URI is not available');
}

// ✅ global cache (important for Vercel)
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { connection: null, promise: null };
}

// ✅ add listeners once
if (!(global as any)._mongooseListenersAdded) {
  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB error:', err);
  });

  (global as any)._mongooseListenersAdded = true;
}

mongoose.set('strictQuery', true);

export const connectToMongoDB = async () => {
  if (cached.connection) {
    console.log('Using cached MongoDB connection');
    return cached.connection;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'GITHUB_NOTE',
      bufferCommands: false,
    });
  }

  cached.connection = await cached.promise;
  return cached.connection;
};
