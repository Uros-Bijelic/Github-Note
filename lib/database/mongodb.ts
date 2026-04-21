'use server';

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MongoDB URI is not availabel');
}

// track the connection
let isConnected = false;

export const connectToMongoDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'GITHUB_NOTE',
    });
    isConnected = true;
    console.log('mongodb connected successfully!');
  } catch (error) {
    console.log('Error connecting to MongoDB went wrong!', error);
  }
};
