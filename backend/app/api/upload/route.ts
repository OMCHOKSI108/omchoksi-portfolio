import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import cloudinary from '@/lib/cloudinary';

// Convert a Web ReadableStream (from File.stream()) to a Node.js Readable
async function webStreamToNodeReadable(webStream: ReadableStream<Uint8Array>) {
  const { Readable } = await import('stream');
  const reader = webStream.getReader();

  return new Readable({
    async read() {
      try {
        const { done, value } = await reader.read();
        if (done) {
          this.push(null);
        } else {
          this.push(Buffer.from(value));
        }
      } catch (err) {
        this.destroy(err as Error);
      }
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Get the web ReadableStream from the File and convert to Node stream to pipe to Cloudinary
    const webStream = (file as any).stream?.();
    if (!webStream) {
      // Fallback to buffering if stream is not available
      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'portfolio' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });
      return NextResponse.json({ url: (result as any).secure_url });
    }

    const nodeStream = await webStreamToNodeReadable(webStream);

    const result: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({ folder: 'portfolio' }, (error: any, res: any) => {
        if (error) return reject(error);
        resolve(res);
      });
      nodeStream.pipe(uploadStream);
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}