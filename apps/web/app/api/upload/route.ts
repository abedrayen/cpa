import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ message: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const extMatch = file.name.match(/\.[a-zA-Z0-9]+$/);
    const ext = extMatch ? extMatch[0].toLowerCase() : '';
    const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];
    if (ext && !allowed.includes(ext)) {
      return NextResponse.json({ message: 'Unsupported file type' }, { status: 400 });
    }

    const hash = crypto.randomBytes(8).toString('hex');
    const safeName =
      file.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-') || 'image';
    const filename = `${safeName}-${hash}${ext || '.jpg'}`;

    // Next.js serves static assets from /public. Use /public/media so URLs like
    // /media/filename.jpg are reachable and work with next/image.
    const mediaDir = path.join(process.cwd(), 'public', 'media');
    await mkdir(mediaDir, { recursive: true });
    const filepath = path.join(mediaDir, filename);
    await writeFile(filepath, buffer);

    const url = `/media/${filename}`;
    return NextResponse.json({ url });
  } catch (err) {
    console.error('Upload failed', err);
    return NextResponse.json({ message: 'Upload failed' }, { status: 500 });
  }
}

