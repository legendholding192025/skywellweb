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

export async function GET() {
  try {
    await connectDB();
    const subscriptions = await Newsletter.find({})
      .sort({ subscriptionDate: -1 }) // Sort by newest first
      .select('-__v'); // Exclude version key

    return NextResponse.json({
      success: true,
      data: subscriptions,
    });
  } catch (error) {
    console.error('Error fetching newsletter subscriptions:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch newsletter subscriptions' },
      { status: 500 }
    );
  }
} 