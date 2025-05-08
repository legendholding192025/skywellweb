import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import connectDB from '@/lib/mongodb';
import TestDrive from '@/models/TestDrive';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Get all test drive submissions
export async function GET(req: Request) {
  try {
    const headersList = headers();
    const authHeader = headersList.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    await connectDB();
    
    const testDrives = await TestDrive.find()
      .sort({ createdAt: -1 })
      .limit(100);
    
    return NextResponse.json(testDrives);
  } catch (error) {
    console.error('Error fetching test drives:', error);
    return NextResponse.json(
      { message: 'Error fetching test drives' },
      { status: 500 }
    );
  }
} 