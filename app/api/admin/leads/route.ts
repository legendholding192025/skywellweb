export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import connectDB from '@/lib/mongodb';
import ServiceBooking from '@/models/ServiceBooking';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

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
    
    const [bookings, total] = await Promise.all([
      ServiceBooking.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      ServiceBooking.countDocuments()
    ]);
    
    if (!bookings || bookings.length === 0) {
      console.log('No service bookings found in database');
    } else {
      console.log(`Found ${bookings.length} service bookings, page ${page} of ${Math.ceil(total/limit)}`);
    }
    
    return NextResponse.json({
      bookings,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error in service bookings API:', error);
    return NextResponse.json(
      { message: 'Error fetching service bookings: ' + (error as Error).message },
      { status: 500 }
    );
  }
} 