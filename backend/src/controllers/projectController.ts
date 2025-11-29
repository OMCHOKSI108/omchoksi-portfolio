import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db';
import * as service from '@/services/projectService';
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

export async function listProjectsHandler(request: NextRequest) {
  try {
    await dbConnect();
    const { q, tags, status, page, limit } = parseListParams(request.url);
    // if requester is admin (has valid admin_token) then return all projects regardless of active flag
    const cookie = request.cookies.get('admin_token')?.value;
    const isAdmin = cookie ? !!verifyToken(cookie) : false;
    // for public users, only return active projects
    const result = await service.listProjects({ q, tags, status, page, limit, active: isAdmin ? undefined : true });
    return build(true, 'Projects fetched', result);
  } catch (err) {
    console.error('listProjectsHandler', err);
    return build(false, 'Failed to fetch projects');
  }
}

export async function createProjectHandler(request: NextRequest, verifyToken: (t: string) => { id: string; email: string } | null) {
  try {
    const cookie = request.cookies.get('admin_token')?.value;
    if (!cookie || !verifyToken(cookie)) return build(false, 'Unauthorized');

    await dbConnect();
    const body = await request.json();
    // basic server-side validation
    if (!body.title || !body.slug) return build(false, 'Missing required fields: title and slug');

    // Ensure images array is present; if not, set a default image that you provided
    if (!body.images || !Array.isArray(body.images) || body.images.length === 0) {
      body.images = [{ url: DEFAULT_PROJECT_IMAGE, caption: 'Default', showOnProject: true }];
    }
    // ensure active defaults to true when creating
    if (typeof body.active === 'undefined') body.active = true;

    const created = await service.createProject(body);
    return build(true, 'Project created', created);
  } catch (err: any) {
    console.error('createProjectHandler', err);
    if (err?.code === 11000) return build(false, 'Duplicate key error');
    return build(false, 'Failed to create project');
  }
}

export async function getProjectHandler(request: NextRequest, id: string) {
  try {
    await dbConnect();
    const project = await service.getProjectById(id);
    if (!project) return build(false, 'Project not found');
    return build(true, 'Project fetched', project);
  } catch (err) {
    console.error('getProjectHandler', err);
    return build(false, 'Failed to fetch project');
  }
}

export async function updateProjectHandler(request: NextRequest, id: string, verifyToken: (t: string) => { id: string; email: string } | null) {
  try {
    const cookie = request.cookies.get('admin_token')?.value;
    if (!cookie || !verifyToken(cookie)) return build(false, 'Unauthorized');

    await dbConnect();
    const body = await request.json();
    // Log incoming update for debugging image persistence issues
    try {
      console.log(`updateProjectHandler: id=${id} incoming images=${Array.isArray(body.images) ? body.images.length : 'none'}`);
    } catch (e) {
      // ignore logging errors
    }

    const updated = await service.updateProject(id, body as any);
    try {
      console.log(`updateProjectHandler: id=${id} updated=${!!updated}`);
      if (updated) console.log('updated.images:', (updated as any).images);
    } catch (e) {
      // ignore
    }
    if (!updated) return build(false, 'Project not found');
    return build(true, 'Project updated', updated);
  } catch (err: any) {
    console.error('updateProjectHandler', err);
    if (err?.code === 11000) return build(false, 'Duplicate key error');
    return build(false, 'Failed to update project');
  }
}

export async function deleteProjectHandler(request: NextRequest, id: string, verifyToken: (t: string) => { id: string; email: string } | null) {
  try {
    const cookie = request.cookies.get('admin_token')?.value;
    if (!cookie || !verifyToken(cookie)) return build(false, 'Unauthorized');

    await dbConnect();
    const deleted = await service.deleteProject(id);
    if (!deleted) return build(false, 'Project not found');
    return build(true, 'Project deleted');
  } catch (err) {
    console.error('deleteProjectHandler', err);
    return build(false, 'Failed to delete project');
  }
}
