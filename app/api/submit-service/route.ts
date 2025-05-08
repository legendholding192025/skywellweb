import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ServiceBooking from '@/models/ServiceBooking';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    await connectDB();
    
    const newBooking = await ServiceBooking.create(body);
    
    return NextResponse.json(
      { message: 'Service booking created successfully', booking: newBooking },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in service booking:', error);
    return NextResponse.json(
      { message: 'Error creating service booking' },
      { status: 500 }
    );
  }
} 