import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import connectDB from '@/lib/mongodb';
import ServiceBooking from '@/models/ServiceBooking';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// DELETE /api/admin/leads/[id] - Delete a service booking
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const headersList = headers();
    const authHeader = headersList.get('authorization');

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

    const serviceBooking = await ServiceBooking.findByIdAndDelete(params.id);
    
    if (!serviceBooking) {
      return NextResponse.json(
        { message: 'Service booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Service booking deleted successfully',
      deletedId: params.id
    });
  } catch (error) {
    console.error('Error in DELETE /api/admin/leads/[id]:', error);
    return NextResponse.json(
      { message: 'Error deleting service booking: ' + (error as Error).message },
      { status: 500 }
    );
  }
} 