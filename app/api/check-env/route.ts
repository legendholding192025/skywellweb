import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    mongodb_uri_exists: !!process.env.MONGODB_URI,
    jwt_secret_exists: !!process.env.JWT_SECRET,
    admin_setup_key_exists: !!process.env.ADMIN_SETUP_KEY,
  });
} 