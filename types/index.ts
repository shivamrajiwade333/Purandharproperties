export type PropertyType = 
  | 'Apartment'
  | 'Flat'
  | 'Villa'
  | 'Bungalow'
  | 'Independent House'
  | 'Plot / Land'
  | 'Commercial Property'
  | 'Office'
  | 'Shop'
  | 'Warehouse'
  | 'Farmhouse'
  | 'PG / Hostel';

export type ListingType = 'Sale' | 'Rent';

export type AvailabilityStatus = 'Available' | 'Sold' | 'Rented';

export type PublishStatus = 'Draft' | 'Published';

export type FurnishingStatus = 'Unfurnished' | 'Semi-Furnished' | 'Fully Furnished';

export interface PropertyMediaVideo {
  url: string;
  title?: string;
  thumbnail?: string;
}

export interface PropertyItem {
  _id: string;
  id?: string;
  title: string;
  slug: string;
  description: string;
  propertyType: PropertyType;
  listingType: ListingType;
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
  area: number; // sq.ft
  carpetArea?: number; // sq.ft
  parking: string; // e.g. "1 Covered", "2 Car Parking", "None"
  furnishing: FurnishingStatus;
  amenities: string[];
  images: string[];
  videos: PropertyMediaVideo[];
  coverImage: string;
  featured: boolean;
  status: AvailabilityStatus;
  publishStatus: PublishStatus;
  ownerName: string;
  phone: string;
  whatsapp: string;
  email: string;
  viewsCount?: number;
  createdAt: string;
  updatedAt: string;
}

export type EnquiryStatus = 'New' | 'Contacted' | 'Closed';

export interface EnquiryItem {
  _id: string;
  id?: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  propertyId?: string;
  propertyTitle?: string;
  status: EnquiryStatus;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface PropertyFilterParams {
  query?: string;
  location?: string;
  city?: string;
  propertyType?: string;
  listingType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: string;
  bathrooms?: string;
  furnishing?: string;
  parking?: string;
  amenities?: string[];
  featured?: boolean;
  status?: string;
  sortBy?: 'newest' | 'price_asc' | 'price_desc' | 'area_desc' | 'featured';
  page?: number;
  limit?: number;
}
