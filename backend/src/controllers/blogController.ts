import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import * as service from '@/services/blogService';
import { build } from '@/lib/response';
import { verifyToken } from '@/lib/auth';
import { DEFAULT_PROJECT_IMAGE } from '@/lib/constants';

function parseListParams(url: string) {
  const u = new URL(url);
  const q = u.searchParams.get('q') || '';
  const tags = (u.searchParams.get('tags') || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
  const status = u.searchParams.get('status') || '';
  const page = Math.max(1, parseInt(u.searchParams.get('page') || '1'));
  const limit = Math.min(100, parseInt(u.searchParams.get('limit') || '24'));
  return { q, tags, status, page, limit };
}

export async function listBlogsHandler(request: NextRequest) {
  try {
    await dbConnect();
    const { q, tags, status, page, limit } = parseListParams(request.url);
    // if requester is admin (has valid admin_token) then return all blogs regardless of active flag
    const cookie = request.cookies.get('admin_token')?.value;
    const isAdmin = cookie ? !!verifyToken(cookie) : false;
    // for public users, only return active blogs
    const result = await service.listBlogs({ q, tags, status, page, limit, active: isAdmin ? undefined : true });
    return build(true, 'Blogs fetched', result);
  } catch (err) {
    console.error('listBlogsHandler', err);
    return build(false, 'Failed to fetch blogs');
  }
}

export async function createBlogHandler(request: NextRequest, verifyToken: (t: string) => { id: string; email: string } | null) {
  try {
    const cookie = request.cookies.get('admin_token')?.value;
    if (!cookie || !verifyToken(cookie)) return build(false, 'Unauthorized');

    await dbConnect();
    const body = await request.json();
    // basic server-side validation
    if (!body.title || !body.slug) return build(false, 'Missing required fields: title and slug');

    // Ensure image is present; if not, set a default image
    if (!body.image) {
      body.image = DEFAULT_PROJECT_IMAGE;
    }
    // ensure active defaults to true when creating
    if (typeof body.active === 'undefined') body.active = true;

    const created = await service.createBlog(body);
    return build(true, 'Blog created', created);
  } catch (err: any) {
    console.error('createBlogHandler', err);
    if (err?.code === 11000) return build(false, 'Duplicate key error');
    return build(false, 'Failed to create blog');
  }
}

export async function getBlogHandler(request: NextRequest, id: string) {
  try {
    await dbConnect();
    const blog = await service.getBlogById(id);
    if (!blog) return build(false, 'Blog not found');
    return build(true, 'Blog fetched', blog);
  } catch (err) {
    console.error('getBlogHandler', err);
    return build(false, 'Failed to fetch blog');
  }
}

export async function updateBlogHandler(request: NextRequest, id: string, verifyToken: (t: string) => { id: string; email: string } | null) {
  try {
    const cookie = request.cookies.get('admin_token')?.value;
    if (!cookie || !verifyToken(cookie)) return build(false, 'Unauthorized');

    await dbConnect();
    const body = await request.json();

    const updated = await service.updateBlog(id, body as any);
    if (!updated) return build(false, 'Blog not found');
    return build(true, 'Blog updated', updated);
  } catch (err: any) {
    console.error('updateBlogHandler', err);
    if (err?.code === 11000) return build(false, 'Duplicate key error');
    return build(false, 'Failed to update blog');
  }
}

export async function deleteBlogHandler(request: NextRequest, id: string, verifyToken: (t: string) => { id: string; email: string } | null) {
  try {
    const cookie = request.cookies.get('admin_token')?.value;
    if (!cookie || !verifyToken(cookie)) return build(false, 'Unauthorized');

    await dbConnect();
    const deleted = await service.deleteBlog(id);
    if (!deleted) return build(false, 'Blog not found');
    return build(true, 'Blog deleted');
  } catch (err) {
    console.error('deleteBlogHandler', err);
    return build(false, 'Failed to delete blog');
  }
}