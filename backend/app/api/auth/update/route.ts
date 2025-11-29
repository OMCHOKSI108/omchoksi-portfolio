import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Admin from '@/models/Admin';
import { hashPassword, signToken, verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { email, password } = await request.json();

    const admin = await Admin.findById(payload.id);
    if (!admin) return NextResponse.json({ error: 'Admin not found' }, { status: 404 });

    let changed = false;
    if (email && email !== admin.email) {
      // ensure unique
      const existing = await Admin.findOne({ email });
      if (existing) return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
      admin.email = email;
      changed = true;
    }

    if (password) {
      admin.passwordHash = await hashPassword(password);
      changed = true;
    }

    if (changed) await admin.save();

    // if email changed, reissue token
    const newToken = signToken({ id: admin._id.toString(), email: admin.email });

    const res = NextResponse.json({ success: true });
    res.cookies.set({
      name: 'admin_token',
      value: newToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
