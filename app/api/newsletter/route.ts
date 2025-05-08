import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Newsletter from '@/models/newsletter';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if email already exists
    const existingSubscription = await Newsletter.findOne({ email });
    if (existingSubscription) {
      if (existingSubscription.status === 'unsubscribed') {
        // Reactivate subscription
        existingSubscription.status = 'active';
        await existingSubscription.save();
        return NextResponse.json({
          success: true,
          message: 'Welcome back! Your subscription has been reactivated.',
        });
      }
      return NextResponse.json(
        { success: false, message: 'Email is already subscribed' },
        { status: 400 }
      );
    }

    // Create new subscription
    const subscription = await Newsletter.create({
      email,
      subscriptionDate: new Date(),
      status: 'active',
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: subscription,
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    await connectDB();
    
    const [subscriptions, total] = await Promise.all([
      Newsletter.find()
        .sort({ subscriptionDate: -1 })
        .skip(skip)
        .limit(limit),
      Newsletter.countDocuments()
    ]);

    return NextResponse.json({
      success: true,
      data: subscriptions,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching newsletter subscriptions:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch newsletter subscriptions' 
      },
      { status: 500 }
    );
  }
} 