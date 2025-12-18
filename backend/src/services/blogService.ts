import Blog, { IBlog } from '@/models/Blog';
import { PaginatedResult } from '@/types/api';

type ListOpts = {
  q?: string;
  tags?: string[];
  status?: string;
  active?: boolean; // when true, only return active blogs; undefined => no filter
  page?: number;
  limit?: number;
};

export async function listBlogs(opts: ListOpts = {}): Promise<PaginatedResult<IBlog>> {
  const page = Math.max(1, opts.page || 1);
  const limit = Math.min(100, opts.limit || 24);
  const skip = (page - 1) * limit;

  const filter: any = {};
  if (opts.q) filter.$text = { $search: opts.q };
  if (opts.tags && opts.tags.length) filter.tags = { $in: opts.tags };
  if (opts.status) filter.status = opts.status;
  // active filter: if opts.active === true, only active blogs are returned
  if (typeof opts.active === 'boolean') {
    filter.active = opts.active;
  }

  const [items, total] = await Promise.all([
    Blog.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).select('title slug image tags status description link createdAt updatedAt active').lean(),
    Blog.countDocuments(filter),
  ]);

  return { items, total, page, limit };
}

export async function createBlog(payload: Partial<IBlog>) {
  const doc = new Blog(payload);
  await doc.save();
  return doc.toObject();
}

export async function getBlogById(id: string) {
  return Blog.findById(id).lean();
}

export async function updateBlog(id: string, payload: Partial<IBlog>) {
  // Use $set to ensure arrays/fields are replaced as provided and enable validators
  return Blog.findByIdAndUpdate(id, { $set: payload }, { new: true, runValidators: true }).lean();
}

export async function deleteBlog(id: string) {
  return Blog.findByIdAndDelete(id).lean();
}