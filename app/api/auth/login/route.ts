import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Admin from '@/models/Admin';
import { comparePassword, signAdminToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const defaultAdminEmail = process.env.ADMIN_EMAIL || 'admin@realestate.com';
    const defaultAdminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    let adminUser = null;
    const db = await connectDB();

    if (db) {
      adminUser = await Admin.findOne({ email: email.toLowerCase() });
    }

    // Check credentials against DB if found, else against environment / default credentials
    let isValid = false;

    if (adminUser) {
      isValid = await comparePassword(password, adminUser.passwordHash);
    } else if (email.toLowerCase() === defaultAdminEmail.toLowerCase()) {
      isValid = (password === defaultAdminPassword);
    }

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Sign JWT token
    const token = await signAdminToken({
      email: email.toLowerCase(),
      name: adminUser?.name || 'Administrator',
    });

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        email: email.toLowerCase(),
        name: adminUser?.name || 'Administrator',
        role: 'admin',
      },
    });

    // Set HTTP-only secure cookie
    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
