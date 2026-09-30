import { PropertyItem, EnquiryItem } from '@/types';
import { INITIAL_PROPERTIES, INITIAL_ENQUIRIES } from './seedData';

// Global memory store for zero-config fallback when MongoDB is not connected
declare global {
  var _realEstatePropertiesStore: PropertyItem[] | undefined;
  var _realEstateEnquiriesStore: EnquiryItem[] | undefined;
}

if (!global._realEstatePropertiesStore) {
  global._realEstatePropertiesStore = [...INITIAL_PROPERTIES];
}

if (!global._realEstateEnquiriesStore) {
  global._realEstateEnquiriesStore = [...INITIAL_ENQUIRIES];
}

export const memoryStore = {
  getProperties: () => global._realEstatePropertiesStore || [],
  
  getPropertyById: (id: string) => {
    const list = global._realEstatePropertiesStore || [];
    return list.find(p => p._id === id || p.id === id || p.slug === id);
  },

  addProperty: (property: Partial<PropertyItem>) => {
    const list = global._realEstatePropertiesStore || [];
    const newId = 'prop-' + Date.now();
    const newProperty: PropertyItem = {
      _id: newId,
      id: newId,
      title: property.title || 'Untitled Property',
      slug: (property.title || 'property').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random()*1000),
      description: property.description || '',
      propertyType: property.propertyType || 'Apartment',
      listingType: property.listingType || 'Sale',
      price: Number(property.price) || 0,
      maintenance: Number(property.maintenance) || 0,
      deposit: Number(property.deposit) || 0,
      address: property.address || '',
      city: property.city || '',
      state: property.state || '',
      pincode: property.pincode || '',
      latitude: property.latitude ? Number(property.latitude) : undefined,
      longitude: property.longitude ? Number(property.longitude) : undefined,
      bedrooms: Number(property.bedrooms) || 0,
      bathrooms: Number(property.bathrooms) || 0,
      balconies: Number(property.balconies) || 0,
      floor: property.floor ? Number(property.floor) : undefined,
      totalFloors: property.totalFloors ? Number(property.totalFloors) : undefined,
      area: Number(property.area) || 0,
      carpetArea: property.carpetArea ? Number(property.carpetArea) : undefined,
      parking: property.parking || 'None',
      furnishing: property.furnishing || 'Unfurnished',
      amenities: Array.isArray(property.amenities) ? property.amenities : [],
      images: Array.isArray(property.images) ? property.images : [],
      videos: Array.isArray(property.videos) ? property.videos : [],
      coverImage: property.coverImage || (property.images?.[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'),
      featured: Boolean(property.featured),
      status: property.status || 'Available',
      publishStatus: property.publishStatus || 'Published',
      ownerName: property.ownerName || 'Property Agent',
      phone: property.phone || '+91 98765 43210',
      whatsapp: property.whatsapp || '919876543210',
      email: property.email || 'agent@realestate.com',
      viewsCount: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    list.unshift(newProperty);
    global._realEstatePropertiesStore = list;
    return newProperty;
  },

  updateProperty: (id: string, updates: Partial<PropertyItem>) => {
    const list = global._realEstatePropertiesStore || [];
    const index = list.findIndex(p => p._id === id || p.id === id);
    if (index === -1) return null;

    const existing = list[index];
    const updatedProperty: PropertyItem = {
      ...existing,
      ...updates,
      price: updates.price !== undefined ? Number(updates.price) : existing.price,
      bedrooms: updates.bedrooms !== undefined ? Number(updates.bedrooms) : existing.bedrooms,
      bathrooms: updates.bathrooms !== undefined ? Number(updates.bathrooms) : existing.bathrooms,
      area: updates.area !== undefined ? Number(updates.area) : existing.area,
      updatedAt: new Date().toISOString(),
    };

    list[index] = updatedProperty;
    global._realEstatePropertiesStore = list;
    return updatedProperty;
  },

  deleteProperty: (id: string) => {
    const list = global._realEstatePropertiesStore || [];
    const filtered = list.filter(p => p._id !== id && p.id !== id);
    const success = filtered.length !== list.length;
    global._realEstatePropertiesStore = filtered;
    return success;
  },

  getEnquiries: () => global._realEstateEnquiriesStore || [],

  addEnquiry: (enquiry: Partial<EnquiryItem>) => {
    const list = global._realEstateEnquiriesStore || [];
    const newEnquiry: EnquiryItem = {
      _id: 'enq-' + Date.now(),
      id: 'enq-' + Date.now(),
      name: enquiry.name || 'Anonymous',
      phone: enquiry.phone || '',
      email: enquiry.email || '',
      message: enquiry.message || '',
      propertyId: enquiry.propertyId || '',
      propertyTitle: enquiry.propertyTitle || 'General Enquiry',
      status: 'New',
      createdAt: new Date().toISOString(),
    };
    list.unshift(newEnquiry);
    global._realEstateEnquiriesStore = list;
    return newEnquiry;
  },

  updateEnquiryStatus: (id: string, status: 'New' | 'Contacted' | 'Closed') => {
    const list = global._realEstateEnquiriesStore || [];
    const index = list.findIndex(e => e._id === id || e.id === id);
    if (index === -1) return null;
    list[index].status = status;
    global._realEstateEnquiriesStore = list;
    return list[index];
  },

  deleteEnquiry: (id: string) => {
    const list = global._realEstateEnquiriesStore || [];
    const filtered = list.filter(e => e._id !== id && e.id !== id);
    global._realEstateEnquiriesStore = filtered;
    return true;
  },

  resetStore: () => {
    global._realEstatePropertiesStore = [...INITIAL_PROPERTIES];
    global._realEstateEnquiriesStore = [...INITIAL_ENQUIRIES];
    return true;
  }
};
