import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  images?: Array<{ url: string; caption?: string; showOnProject?: boolean }>;
  active?: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true, index: true },
  slug: { type: String, required: true, unique: true, index: true },
  description: { type: String, required: true },
  tags: [{ type: String, index: true }],
  liveUrl: { type: String },
  githubUrl: { type: String },
  images: [
    {
      url: { type: String },
      caption: { type: String },
      showOnProject: { type: Boolean, default: false },
    },
  ],
  active: { type: Boolean, default: true, index: true },
  featured: { type: Boolean, default: false, index: true },
  status: { type: String, enum: ['draft', 'live', 'archived'], default: 'draft', index: true },
}, {
  timestamps: true,
});

// Text index for fast title/description search
ProjectSchema.index({ title: 'text', description: 'text' });

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);