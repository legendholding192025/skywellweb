import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import connectDB from './mongodb';
import Admin from '@/models/Admin';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function verifyAuth(req: Request) {
  try {
    let token;
    
    // Try to get token from request cookies first (for API routes)
    const cookieHeader = req.headers.get('cookie');
    if (cookieHeader) {
      const cookies = cookieHeader.split(';').reduce((acc: any, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
      }, {});
      token = cookies['admin_token'];
    }

    // If no token in request cookies, try server-side cookies
    if (!token) {
      try {
        const cookieStore = cookies();
        token = cookieStore.get('admin_token')?.value;
      } catch (e) {
        // Ignore error if cookies() fails (client-side)
      }
    }

    if (!token) {
      return null;
    }

    // Verify token
    const decoded = verify(token, process.env.JWT_SECRET!) as { id: string };
    if (!decoded) {
      return null;
    }

    // Get admin from database
    await connectDB();
    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) {
      return null;
    }

    return admin;
  } catch (error) {
    console.error('Auth verification error:', error);
    return null;
  }
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
}

export async function getToken(): Promise<string | null> {
  const cookieStore = cookies();
  return cookieStore.get('admin_token')?.value || null;
}

export function generateToken(payload: any): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
} 