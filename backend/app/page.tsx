import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '../src/lib/auth';

export default async function Page() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    if (token) {
      const payload = verifyToken(token);
      if (payload) return redirect('/admin/projects');
    }
  } catch (err) {
    // ignore and show login
  }
  return redirect('/admin/login');
}
