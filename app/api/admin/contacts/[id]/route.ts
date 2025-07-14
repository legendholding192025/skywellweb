import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// DELETE /api/admin/contacts/[id] - Delete a contact request
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

    const contact = await Contact.findByIdAndDelete(params.id);
    
    if (!contact) {
      return NextResponse.json(
        { message: 'Contact request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Contact request deleted successfully',
      deletedId: params.id
    });
  } catch (error) {
    console.error('Error in DELETE /api/admin/contacts/[id]:', error);
    return NextResponse.json(
      { message: 'Error deleting contact request: ' + (error as Error).message },
      { status: 500 }
    );
  }
} 