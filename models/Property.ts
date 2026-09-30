import mongoose, { Schema, Document } from 'mongoose';

export interface IProperty extends Document {
  title: string;
  slug: string;
  description: string;
  propertyType: string;
  listingType: string;
  price: number;
  maintenance?: number;
  deposit?: number;
  address: string;
  city: string;
  state: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  bedrooms: number;
  bathrooms: number;
  balconies?: number;
  floor?: number;
  totalFloors?: number;
  area: number;
  carpetArea?: number;
  parking: string;
  furnishing: string;
  amenities: string[];
  images: string[];
  videos: { url: string; title?: string; thumbnail?: string }[];
  coverImage: string;
  featured: boolean;
  status: string;
  publishStatus: string;
  ownerName: string;
  phone: string;
  whatsapp: string;
  email: string;
  viewsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    propertyType: { type: String, required: true, index: true },
    listingType: { type: String, required: true, enum: ['Sale', 'Rent'], index: true },
    price: { type: Number, required: true, index: true },
    maintenance: { type: Number, default: 0 },
    deposit: { type: Number, default: 0 },
    address: { type: String, required: true },
    city: { type: String, required: true, index: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    latitude: { type: Number },
    longitude: { type: Number },
    bedrooms: { type: Number, required: true, default: 0 },
    bathrooms: { type: Number, required: true, default: 0 },
    balconies: { type: Number, default: 0 },
    floor: { type: Number },
    totalFloors: { type: Number },
    area: { type: Number, required: true, index: true },
    carpetArea: { type: Number },
    parking: { type: String, default: 'None' },
    furnishing: { type: String, default: 'Unfurnished' },
    amenities: [{ type: String }],
    images: [{ type: String }],
    videos: [
      {
        url: { type: String },
        title: { type: String },
        thumbnail: { type: String },
      },
    ],
    coverImage: { type: String, required: true },
    featured: { type: Boolean, default: false, index: true },
    status: { type: String, default: 'Available', enum: ['Available', 'Sold', 'Rented'], index: true },
    publishStatus: { type: String, default: 'Published', enum: ['Draft', 'Published'], index: true },
    ownerName: { type: String, required: true },
    phone: { type: String, required: true },
    whatsapp: { type: String, required: true },
    email: { type: String, required: true },
    viewsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Property || mongoose.model<IProperty>('Property', PropertySchema);
