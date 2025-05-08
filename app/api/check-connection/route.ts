import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await connectDB();
    
    // Check if we're connected
    const readyState = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
    };
    
    const status = states[readyState as keyof typeof states];
    
    return NextResponse.json({
      status,
      connected: readyState === 1,
      message: `Database is ${status}`
    });
    
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({
      status: 'error',
      connected: false,
      message: 'Failed to connect to database',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 