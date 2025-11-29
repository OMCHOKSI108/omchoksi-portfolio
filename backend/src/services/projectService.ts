import Project, { IProject } from '@/models/Project';
import { PaginatedResult } from '@/types/api';

type ListOpts = {
  q?: string;
  tags?: string[];
  status?: string;
  active?: boolean; // when true, only return active projects; undefined => no filter
  page?: number;
  limit?: number;
};

export async function listProjects(opts: ListOpts = {}): Promise<PaginatedResult<IProject>> {
  const page = Math.max(1, opts.page || 1);
  const limit = Math.min(100, opts.limit || 24);
  const skip = (page - 1) * limit;

  const filter: any = {};
  if (opts.q) filter.$text = { $search: opts.q };
  if (opts.tags && opts.tags.length) filter.tags = { $in: opts.tags };
  if (opts.status) filter.status = opts.status;
  // active filter: if opts.active === true, only active projects are returned
  if (typeof opts.active === 'boolean') {
    filter.active = opts.active;
  }

  const [items, total] = await Promise.all([
    Project.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).select('title slug images tags status description createdAt updatedAt active').lean(),
    Project.countDocuments(filter),
  ]);

  return { items, total, page, limit };
}

export async function createProject(payload: Partial<IProject>) {
  const doc = new Project(payload);
  await doc.save();
  return doc.toObject();
}

export async function getProjectById(id: string) {
  return Project.findById(id).lean();
}

export async function updateProject(id: string, payload: Partial<IProject>) {
  // Use $set to ensure arrays/fields are replaced as provided and enable validators
  return Project.findByIdAndUpdate(id, { $set: payload }, { new: true, runValidators: true }).lean();
}

export async function deleteProject(id: string) {
  return Project.findByIdAndDelete(id).lean();
}
