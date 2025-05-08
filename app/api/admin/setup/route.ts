import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';

const SETUP_KEY = process.env.ADMIN_SETUP_KEY || 'your-setup-key';

export async function POST(req: Request) {
  try {
    const { name, email, password, setupKey } = await req.json();

    // Verify setup key
    if (setupKey !== SETUP_KEY) {
      return NextResponse.json(
        { message: 'Invalid setup key' },
        { status: 401 }
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

    // Create admin
    const admin = await Admin.create({
      name,
      email,
      password,
    });

    return NextResponse.json(
      { message: 'Admin created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json(
      { message: 'Error creating admin' },
      { status: 500 }
    );
  }
} 