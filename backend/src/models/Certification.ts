import mongoose, { Schema, Document } from 'mongoose';

export interface ICertification extends Document {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  link?: string;
  image?: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialId?: string;
  pdf?: string;
  active?: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CertificationSchema: Schema = new Schema({
  title: { type: String, required: true, index: true },
  slug: { type: String, required: true, unique: true, index: true },
  description: { type: String, required: true },
  tags: [{ type: String, index: true }],
  link: { type: String },
  image: { type: String },
  pdf: { type: String },
  issuer: { type: String, required: true },
  issueDate: { type: Date, required: true },
  expiryDate: { type: Date },
  credentialId: { type: String },
  active: { type: Boolean, default: true, index: true },
  featured: { type: Boolean, default: false, index: true },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft', index: true },
}, {
  timestamps: true,
});

// Text index for fast title/description search
CertificationSchema.index({ title: 'text', description: 'text' });

export default mongoose.models.Certification || mongoose.model<ICertification>('Certification', CertificationSchema);