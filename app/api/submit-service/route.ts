import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ServiceBooking from '@/models/ServiceBooking';
import { sendServiceBookingNotification } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    await connectDB();
    
    const newBooking = await ServiceBooking.create(body);
    
    // Send email notification to admin
    try {
      await sendServiceBookingNotification(body);
      console.log("Service booking notification email sent successfully");
    } catch (emailError) {
      console.error("Error sending service booking notification email:", emailError);
      // Continue with response even if email fails
    }
    
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