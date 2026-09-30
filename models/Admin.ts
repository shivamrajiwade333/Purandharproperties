import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
  email: string;
  passwordHash: string;
  name: string;
  role: string;
}

const AdminSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true, default: 'Administrator' },
    role: { type: String, default: 'admin' },
  },
  { timestamps: true }
);

export default mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);
