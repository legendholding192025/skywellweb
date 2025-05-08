import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';

export async function POST(request: Request) {
  try {
    const { email, password, adminKey } = await request.json();

    // Verify admin registration key (you should store this in environment variables)
    const ADMIN_REGISTRATION_KEY = process.env.ADMIN_REGISTRATION_KEY;
    if (!ADMIN_REGISTRATION_KEY || adminKey !== ADMIN_REGISTRATION_KEY) {
      return NextResponse.json(
        { message: 'Invalid admin registration key' },
        { status: 403 }
      );
    }

    await connectDB();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return NextResponse.json(
        { message: 'Admin already exists' },
        { status: 400 }
      );
    }

    // Create new admin
    const admin = await Admin.create({
      email,
      password,  // The password will be hashed by the pre-save middleware
      name: email.split('@')[0], // Set a default name based on email
    });

    return NextResponse.json(
      { message: 'Admin created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Admin registration error:', error);
    return NextResponse.json(
      { message: 'Error creating admin account' },
      { status: 500 }
    );
  }
} 