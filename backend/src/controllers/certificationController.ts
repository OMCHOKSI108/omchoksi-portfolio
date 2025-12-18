import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import * as service from '@/services/certificationService';
import { build } from '@/lib/response';
import { verifyToken } from '@/lib/auth';
import { DEFAULT_PROJECT_IMAGE } from '@/lib/constants';

function parseListParams(url: string) {
  const u = new URL(url);
  const q = u.searchParams.get('q') || '';
  const slug = u.searchParams.get('slug') || '';
  const tags = (u.searchParams.get('tags') || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
  const status = u.searchParams.get('status') || '';
  const page = Math.max(1, parseInt(u.searchParams.get('page') || '1'));
  const limit = Math.min(100, parseInt(u.searchParams.get('limit') || '24'));
  return { q, slug, tags, status, page, limit };
}

export async function listCertificationsHandler(request: NextRequest) {
  try {
    await dbConnect();
    const { q, slug, tags, status, page, limit } = parseListParams(request.url);
    // if requester is admin (has valid admin_token) then return all certifications regardless of active flag
    const cookie = request.cookies.get('admin_token')?.value;
    const isAdmin = cookie ? !!verifyToken(cookie) : false;
    // for public users, only return active certifications
    const result = await service.listCertifications({ q, slug, tags, status, page, limit, active: isAdmin ? undefined : true });
    return build(true, 'Certifications fetched', result);
  } catch (err) {
    console.error('listCertificationsHandler', err);
    return build(false, 'Failed to fetch certifications');
  }
}

export async function createCertificationHandler(request: NextRequest, verifyToken: (t: string) => { id: string; email: string } | null) {
  try {
    const cookie = request.cookies.get('admin_token')?.value;
    if (!cookie || !verifyToken(cookie)) return build(false, 'Unauthorized');

    await dbConnect();
    const body = await request.json();
    // basic server-side validation
    if (!body.title || !body.slug || !body.issuer || !body.issueDate) return build(false, 'Missing required fields: title, slug, issuer, and issueDate');

    // Ensure image is present; if not, set a default image
    if (!body.image) {
      body.image = DEFAULT_PROJECT_IMAGE;
    }
    // ensure active defaults to true when creating
    if (typeof body.active === 'undefined') body.active = true;

    const created = await service.createCertification(body);
    return build(true, 'Certification created', created);
  } catch (err: any) {
    console.error('createCertificationHandler', err);
    if (err?.code === 11000) return build(false, 'Duplicate key error');
    return build(false, 'Failed to create certification');
  }
}

export async function getCertificationHandler(request: NextRequest, id: string) {
  try {
    await dbConnect();
    const certification = await service.getCertificationById(id);
    if (!certification) return build(false, 'Certification not found');
    return build(true, 'Certification fetched', certification);
  } catch (err) {
    console.error('getCertificationHandler', err);
    return build(false, 'Failed to fetch certification');
  }
}

export async function getCertificationBySlugHandler(request: NextRequest, slug: string) {
  try {
    await dbConnect();
    const certification = await service.getCertificationBySlug(slug);
    if (!certification) return build(false, 'Certification not found');
    return build(true, 'Certification fetched', certification);
  } catch (err) {
    console.error('getCertificationBySlugHandler', err);
    return build(false, 'Failed to fetch certification');
  }
}

export async function updateCertificationHandler(request: NextRequest, id: string, verifyToken: (t: string) => { id: string; email: string } | null) {
  try {
    const cookie = request.cookies.get('admin_token')?.value;
    if (!cookie || !verifyToken(cookie)) return build(false, 'Unauthorized');

    await dbConnect();
    const body = await request.json();

    const updated = await service.updateCertification(id, body as any);
    if (!updated) return build(false, 'Certification not found');
    return build(true, 'Certification updated', updated);
  } catch (err: any) {
    console.error('updateCertificationHandler', err);
    if (err?.code === 11000) return build(false, 'Duplicate key error');
    return build(false, 'Failed to update certification');
  }
}

export async function deleteCertificationHandler(request: NextRequest, id: string, verifyToken: (t: string) => { id: string; email: string } | null) {
  try {
    const cookie = request.cookies.get('admin_token')?.value;
    if (!cookie || !verifyToken(cookie)) return build(false, 'Unauthorized');

    await dbConnect();
    const deleted = await service.deleteCertification(id);
    if (!deleted) return build(false, 'Certification not found');
    return build(false, 'Certification deleted');
  } catch (err) {
    console.error('deleteCertificationHandler', err);
    return build(false, 'Failed to delete certification');
  }
}