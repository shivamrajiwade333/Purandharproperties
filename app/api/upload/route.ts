import { NextResponse } from 'next/server';
import { getAdminFromCookies } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized admin access required' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const ext = path.extname(file.name) || (file.type.includes('video') ? '.mp4' : '.jpg');
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      // directory exists
    }

    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: file.name,
      type: file.type.includes('video') ? 'video' : 'image',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'File upload failed' }, { status: 500 });
  }
}
