import { NextResponse } from 'next/server';
import { getAdminFromCookies } from '@/lib/auth';

export async function GET() {
  const admin = await getAdminFromCookies();
  if (!admin) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      email: admin.email,
      name: admin.name || 'Administrator',
      role: 'admin',
    },
  });
}
