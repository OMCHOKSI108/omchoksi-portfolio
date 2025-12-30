import Certification, { ICertification } from '@/models/Certification';
import { PaginatedResult } from '@/types/api';

type ListOpts = {
  q?: string;
  slug?: string;
  tags?: string[];
  status?: string;
  active?: boolean; // when true, only return active certifications; undefined => no filter
  page?: number;
  limit?: number;
};

export async function listCertifications(opts: ListOpts = {}): Promise<PaginatedResult<ICertification>> {
  // If slug is provided, return a single certification
  if (opts.slug) {
    const certification = await Certification.findOne({ slug: opts.slug }).lean();
    if (certification) {
      return { items: [certification], total: 1, page: 1, limit: 1 };
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
  // active filter: if opts.active === true, only active certifications are returned
  if (typeof opts.active === 'boolean') {
    filter.active = opts.active;
  }

  const [items, total] = await Promise.all([
    Certification.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).select('title slug image tags status description link issuer issueDate expiryDate credentialId createdAt updatedAt active featured').lean(),
    Certification.countDocuments(filter),
  ]);

  return { items, total, page, limit };
}

export async function createCertification(payload: Partial<ICertification>) {
  const doc = new Certification(payload);
  await doc.save();
  return doc.toObject();
}

export async function getCertificationById(id: string) {
  return Certification.findById(id).lean();
}

export async function getCertificationBySlug(slug: string) {
  return Certification.findOne({ slug }).lean();
}

export async function updateCertification(id: string, payload: Partial<ICertification>) {
  // Use $set to ensure arrays/fields are replaced as provided and enable validators
  return Certification.findByIdAndUpdate(id, { $set: payload }, { new: true, runValidators: true }).lean();
}

export async function deleteCertification(id: string) {
  return Certification.findByIdAndDelete(id).lean();
}