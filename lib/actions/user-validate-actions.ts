'use server';

import { connectToMongoDB } from '../database/mongodb';
import { loginFormSchema } from '../zod/user-schema';

import { compareSync } from 'bcryptjs';

import User from '@/models/user';

export const validateUserOnLogin = async (email: string, password: string) => {
  try {
    const validatedCredentials = loginFormSchema.safeParse({
      email,
      password,
    });
    if (!validatedCredentials.success) {
      throw new Error('Bad credentials.');
    }

    await connectToMongoDB();

    const user = await User.findOne({
      email,
    }).lean();

    if (!user?.password) return null;

    if (!compareSync(password as string, user.password)) return null;

    return JSON.parse(JSON.stringify(user));
  } catch (error) {}
};
