import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';
import TestDrive from '@/models/TestDrive';
import Quote from '@/models/Quote';
import Newsletter from '@/models/newsletter';
import Blog from '@/models/Blog';
import Service from '@/models/Service';

export async function GET() {
  try {
    await connectDB();

    // Fetch counts for all models in parallel
    const [
      contactCount,
      testDriveCount,
      quoteCount,
      newsletterCount,
      blogCount,
      serviceCount
    ] = await Promise.all([
      Contact.countDocuments(),
      TestDrive.countDocuments(),
      Quote.countDocuments(),
      Newsletter.countDocuments({ status: 'active' }),
      Blog.countDocuments(),
      Service.countDocuments()
    ]);

    return NextResponse.json({
      success: true,
      data: {
        contacts: contactCount,
        testDrives: testDriveCount,
        quotes: quoteCount,
        newsletter: newsletterCount,
        blogs: blogCount,
        services: serviceCount
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard counts:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch dashboard counts' },
      { status: 500 }
    );
  }
} 