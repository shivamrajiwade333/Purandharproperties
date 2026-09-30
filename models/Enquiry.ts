import mongoose, { Schema, Document } from 'mongoose';

export interface IEnquiry extends Document {
  name: string;
  phone: string;
  email: string;
  message: string;
  propertyId?: string;
  propertyTitle?: string;
  status: 'New' | 'Contacted' | 'Closed';
  createdAt: Date;
}

const EnquirySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    propertyId: { type: String },
    propertyTitle: { type: String },
    status: { type: String, enum: ['New', 'Contacted', 'Closed'], default: 'New', index: true },
  },
  { timestamps: true }
);

export default mongoose.models.Enquiry || mongoose.model<IEnquiry>('Enquiry', EnquirySchema);
