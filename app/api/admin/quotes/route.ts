export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import connectDB from '@/lib/mongodb';
import Quote from '@/models/Quote';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Get all quote submissions with pagination
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
    
    // If limit is high (e.g., 1000), we're fetching for export
    const isExport = limit > 100;
    
    const [quotes, total] = await Promise.all([
      Quote.find()
        .sort({ createdAt: -1 })
        .skip(isExport ? 0 : skip)
        .limit(isExport ? 0 : limit),
      Quote.countDocuments()
    ]);
    
    if (!quotes || quotes.length === 0) {
      console.log('No quotes found in database');
    } else {
      console.log(`Found ${quotes.length} quotes, page ${page} of ${Math.ceil(total/limit)}`);
    }
    
    return NextResponse.json({
      quotes,
      total,
      page: isExport ? 1 : page,
      totalPages: isExport ? 1 : Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error in quotes API:', error);
    return NextResponse.json(
      { message: 'Error fetching quotes: ' + (error as Error).message },
      { status: 500 }
    );
  }
} 