import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Property from '@/models/Property';
import { memoryStore } from '@/lib/store';
import { getAdminFromCookies } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const db = await connectDB();

    if (db) {
      let item = null;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        item = await Property.findById(id);
      }
      if (!item) {
        item = await Property.findOne({ slug: id });
      }

      if (item) {
        // Increment views count
        item.viewsCount = (item.viewsCount || 0) + 1;
        await item.save();
        return NextResponse.json({ success: true, data: item });
      }
    }

    const itemMemory = memoryStore.getPropertyById(id);
    if (!itemMemory) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    itemMemory.viewsCount = (itemMemory.viewsCount || 0) + 1;
    return NextResponse.json({ success: true, data: itemMemory });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized admin access required' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();

    const db = await connectDB();

    if (db) {
      let updated = null;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        updated = await Property.findByIdAndUpdate(id, body, { new: true, runValidators: true });
      }
      if (!updated) {
        updated = await Property.findOneAndUpdate({ slug: id }, body, { new: true, runValidators: true });
      }

      if (updated) {
        return NextResponse.json({ success: true, data: updated });
      }
    }

    const updatedMemory = memoryStore.updateProperty(id, body);
    if (!updatedMemory) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedMemory });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized admin access required' }, { status: 401 });
    }

    const { id } = params;
    const db = await connectDB();

    if (db) {
      let deleted = null;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        deleted = await Property.findByIdAndDelete(id);
      }
      if (!deleted) {
        deleted = await Property.findOneAndDelete({ slug: id });
      }

      if (deleted) {
        return NextResponse.json({ success: true, message: 'Property deleted successfully' });
      }
    }

    const success = memoryStore.deleteProperty(id);
    if (!success) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Property deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
