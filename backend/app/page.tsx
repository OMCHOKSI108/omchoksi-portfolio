import { redirect } from 'next/navigation';

export default function Page() {
  // For public deployments we want the root to show public projects.
  // Redirect to `/projects` (public listing) instead of forcing admin login.
  return redirect('/projects');
}
