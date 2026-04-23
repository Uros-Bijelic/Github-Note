import { connectToMongoDB } from '@/lib/database/mongodb';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await connectToMongoDB();

    // safer check
    if (!mongoose.connection.db) {
      throw new Error('DB not initialized');
    }

    await mongoose.connection.db.admin().ping();

    console.log('Pinged MongoDB at', new Date().toISOString());

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ ok: false, error: String(err) });
  }
}
