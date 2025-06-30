import { NextRequest, NextResponse } from 'next/server';

// Disable Next.js default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  // Parse multipart form
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  // Forward file ke API eksternal
  const forwardForm = new FormData();
  forwardForm.append('file', file, file.name);

  const apiRes = await fetch('https://21ba-114-10-154-180.ngrok-free.app/remove-bg/', {
    method: 'POST',
    body: forwardForm,
    // headers: forwardForm.headers, // Jangan set Content-Type manual
  });

  if (!apiRes.ok) {
    return NextResponse.json({ error: 'Failed to remove background' }, { status: 500 });
  }

  // --- Perbaikan di sini: ---
  // Cek content-type, jika image, konversi ke base64 dataURL
  const contentType = apiRes.headers.get('content-type');
  if (contentType && contentType.startsWith('image/')) {
    const arrayBuffer = await apiRes.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const dataUrl = `data:${contentType};base64,${base64}`;
    return NextResponse.json({ processedImage: dataUrl });
  } else {
    // Jika memang JSON, tetap parse JSON
    const data = await apiRes.json();
    return NextResponse.json(data);
  }
}