import Project, { IProject } from '@/models/Project';
import { PaginatedResult } from '@/types/api';

type ListOpts = {
  q?: string;
  slug?: string;
  tags?: string[];
  status?: string;
  active?: boolean; // when true, only return active projects; undefined => no filter
  page?: number;
  limit?: number;
};

export async function listProjects(opts: ListOpts = {}): Promise<PaginatedResult<IProject>> {
  // If slug is provided, return a single project
  if (opts.slug) {
    const project = await Project.findOne({ slug: opts.slug }).lean();
    if (project) {
      return { items: [project], total: 1, page: 1, limit: 1 };
    } else {
      return { items: [], total: 0, page: 1, limit: 1 };
    }
  }

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
    Project.find(filter)
      .sort({ priority: 1, createdAt: -1 }) // Sort by priority (ascending), then by createdAt (descending)
      .skip(skip)
      .limit(limit)
      .select('title slug images tags status description projectMarkdown createdAt updatedAt active priority')
      .lean(),
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

// Update priority for a single project
export async function updateProjectPriority(id: string, priority: number) {
  return Project.findByIdAndUpdate(id, { $set: { priority } }, { new: true, runValidators: true }).lean();
}

// Bulk update priorities for multiple projects
export async function bulkUpdatePriorities(updates: Array<{ id: string; priority: number }>) {
  const bulkOps = updates.map(({ id, priority }) => ({
    updateOne: {
      filter: { _id: id },
      update: { $set: { priority } },
    },
  }));

  if (bulkOps.length === 0) return { modifiedCount: 0 };

  const result = await Project.bulkWrite(bulkOps);
  return result;
}
