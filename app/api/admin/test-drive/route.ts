export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import connectDB from '@/lib/mongodb';
import TestDrive from '@/models/TestDrive';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Get all test drive submissions with pagination
export async function GET(req: Request) {
  try {
    const headersList = headers();
    const authHeader = headersList.get('authorization');
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('Authentication header missing or invalid');
      return NextResponse.json(
        { message: 'Unauthorized - Invalid header' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.error('JWT verification failed:', error);
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    try {
      await connectDB();
    } catch (error) {
      console.error('MongoDB connection failed:', error);
      return NextResponse.json(
        { message: 'Database connection failed' },
        { status: 500 }
      );
    }
    
    const [testDrives, total] = await Promise.all([
      TestDrive.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      TestDrive.countDocuments()
    ]);
    
    if (!testDrives || testDrives.length === 0) {
      console.log('No test drives found in database');
    } else {
      console.log(`Found ${testDrives.length} test drives, page ${page} of ${Math.ceil(total/limit)}`);
    }
    
    return NextResponse.json({
      testDrives,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error in test drive API:', error);
    return NextResponse.json(
      { message: 'Error fetching test drives: ' + (error as Error).message },
      { status: 500 }
    );
  }
} 