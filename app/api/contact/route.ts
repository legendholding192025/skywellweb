import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    await connectDB();
    
    const contact = await Contact.create(body);
    
    if (contact) {
      return NextResponse.json(
        { message: 'Contact form submitted successfully', success: true },
        { status: 201 }
      );
    } else {
      throw new Error('Failed to create contact');
    }
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { message: 'Error submitting contact form', success: false },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
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
    
    const contacts = await Contact.find().sort({ createdAt: -1 });
    
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { message: 'Error fetching contacts' },
      { status: 500 }
    );
  }
} 