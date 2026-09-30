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

    const isVideo = file.type.includes('video');
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    // Direct Cloudinary Cloud Upload
    if (cloudName && (uploadPreset || (apiKey && apiSecret))) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Data = `data:${file.type};base64,${buffer.toString('base64')}`;

      const cldFormData = new FormData();
      cldFormData.append('file', base64Data);
      
      if (uploadPreset) {
        cldFormData.append('upload_preset', uploadPreset);
      } else if (apiKey) {
        cldFormData.append('api_key', apiKey);
      }

      const resourceType = isVideo ? 'video' : 'image';
      const cldRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
        method: 'POST',
        body: cldFormData,
      });

      const cldJson = await cldRes.json();
      if (cldJson.secure_url) {
        return NextResponse.json({
          success: true,
          url: cldJson.secure_url,
          filename: file.name,
          type: isVideo ? 'video' : 'image',
          provider: 'cloudinary'
        });
      }
    }

    // Fallback: Local file storage
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = path.extname(file.name) || (isVideo ? '.mp4' : '.jpg');
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {}

    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      url: `/uploads/${filename}`,
      filename: file.name,
      type: isVideo ? 'video' : 'image',
      provider: 'local'
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'File upload failed' }, { status: 500 });
  }
}
