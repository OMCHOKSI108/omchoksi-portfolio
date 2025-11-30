import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  link?: string;
  image?: string;
  active?: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true, index: true },
  slug: { type: String, required: true, unique: true, index: true },
  description: { type: String, required: true },
  tags: [{ type: String, index: true }],
  link: { type: String },
  image: { type: String },
  active: { type: Boolean, default: true, index: true },
  featured: { type: Boolean, default: false, index: true },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft', index: true },
}, {
  timestamps: true,
});

// Text index for fast title/description search
BlogSchema.index({ title: 'text', description: 'text' });

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);