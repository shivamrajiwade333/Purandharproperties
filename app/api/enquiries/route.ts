import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Enquiry from '@/models/Enquiry';
import { memoryStore } from '@/lib/store';
import { getAdminFromCookies } from '@/lib/auth';

// GET enquiries (Admin protected)
export async function GET() {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized admin access required' }, { status: 401 });
    }

    const db = await connectDB();

    if (db) {
      const list = await Enquiry.find({}).sort({ createdAt: -1 });
      return NextResponse.json({ success: true, count: list.length, data: list });
    }

    const memoryList = memoryStore.getEnquiries();
    return NextResponse.json({ success: true, count: memoryList.length, data: memoryList });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// POST new enquiry (Public)
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.phone || !body.email || !body.message) {
      return NextResponse.json({ error: 'Please provide all required fields (name, phone, email, message)' }, { status: 400 });
    }

    const db = await connectDB();

    if (db) {
      const created = await Enquiry.create(body);
      return NextResponse.json({ success: true, message: 'Enquiry submitted successfully', data: created }, { status: 201 });
    }

    const createdMemory = memoryStore.addEnquiry(body);
    return NextResponse.json({ success: true, message: 'Enquiry submitted successfully', data: createdMemory }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// PATCH update status (Admin protected)
export async function PATCH(request: Request) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized admin access required' }, { status: 401 });
    }

    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ error: 'Enquiry id and status are required' }, { status: 400 });
    }

    const db = await connectDB();

    if (db) {
      const updated = await Enquiry.findByIdAndUpdate(id, { status }, { new: true });
      if (updated) {
        return NextResponse.json({ success: true, data: updated });
      }
    }

    const updatedMemory = memoryStore.updateEnquiryStatus(id, status);
    return NextResponse.json({ success: true, data: updatedMemory });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE enquiry (Admin protected)
export async function DELETE(request: Request) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized admin access required' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Enquiry id is required' }, { status: 400 });
    }

    const db = await connectDB();

    if (db) {
      await Enquiry.findByIdAndDelete(id);
      return NextResponse.json({ success: true, message: 'Enquiry deleted' });
    }

    memoryStore.deleteEnquiry(id);
    return NextResponse.json({ success: true, message: 'Enquiry deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
