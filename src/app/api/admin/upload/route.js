import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const publicDir = path.join(root, 'public');

function isProd() {
  return process.env.NODE_ENV === 'production';
}

export async function POST(request) {
  if (isProd()) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  try {
    const formData = await request.formData();
    const slug = formData.get('slug');
    const files = [
      ...(formData.getAll('file') || []),
      ...(formData.getAll('files') || []),
    ].filter(Boolean);
    if (!files.length) {
      return NextResponse.json(
        { error: 'No file(s) provided' },
        { status: 400 }
      );
    }
    const slugDir = path.join(publicDir, 'website-assets', 'projects', String(slug || 'uploads').replace(/[^a-zA-Z0-9-_]/g, '-'));
    if (!fs.existsSync(slugDir)) {
      fs.mkdirSync(slugDir, { recursive: true });
    }
    const urls = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (typeof file === 'string') continue;
      const name = file.name || `image-${Date.now()}-${i}`;
      const safeName = name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const filePath = path.join(slugDir, safeName);
      const buffer = Buffer.from(await file.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      const publicUrl = `/website-assets/projects/${path.basename(slugDir)}/${safeName}`;
      urls.push(publicUrl);
    }
    if (urls.length === 1) {
      return NextResponse.json({ file_url: urls[0] });
    }
    return NextResponse.json({ file_urls: urls });
  } catch (err) {
    console.error('POST /api/admin/upload', err);
    return NextResponse.json(
      { error: 'Failed to upload' },
      { status: 500 }
    );
  }
}
