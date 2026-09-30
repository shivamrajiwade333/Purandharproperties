import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Property from '@/models/Property';
import Enquiry from '@/models/Enquiry';
import Admin from '@/models/Admin';
import { INITIAL_PROPERTIES, INITIAL_ENQUIRIES } from '@/lib/seedData';
import { memoryStore } from '@/lib/store';
import { hashPassword } from '@/lib/auth';

export async function POST() {
  try {
    const db = await connectDB();

    if (db) {
      // Clear existing records
      await Property.deleteMany({});
      await Enquiry.deleteMany({});
      await Admin.deleteMany({});

      // Seed properties
      await Property.insertMany(INITIAL_PROPERTIES);

      // Seed enquiries
      await Enquiry.insertMany(INITIAL_ENQUIRIES);

      // Seed admin user
      const defaultEmail = process.env.ADMIN_EMAIL || 'admin@realestate.com';
      const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';
      const passwordHash = await hashPassword(defaultPassword);

      await Admin.create({
        email: defaultEmail,
        passwordHash,
        name: 'Super Admin',
        role: 'admin',
      });

      return NextResponse.json({
        success: true,
        message: 'Database seeded successfully with sample properties, enquiries, and admin user!',
        adminCredentials: { email: defaultEmail, password: defaultPassword },
      });
    }

    // Reset memory store
    memoryStore.resetStore();

    return NextResponse.json({
      success: true,
      message: 'Memory store reset and seeded successfully!',
      adminCredentials: { email: 'admin@realestate.com', password: 'admin123' },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Seeding failed' }, { status: 500 });
  }
}

export async function GET() {
  return POST();
}
