import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Property from '@/models/Property';
import { memoryStore } from '@/lib/store';
import { getAdminFromCookies } from '@/lib/auth';
import { PropertyItem } from '@/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get('query')?.toLowerCase();
    const location = searchParams.get('location') || searchParams.get('city');
    const propertyType = searchParams.get('propertyType');
    const listingType = searchParams.get('listingType');
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : null;
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : null;
    const bedrooms = searchParams.get('bedrooms');
    const bathrooms = searchParams.get('bathrooms');
    const furnishing = searchParams.get('furnishing');
    const parking = searchParams.get('parking');
    const featured = searchParams.get('featured') === 'true' ? true : searchParams.get('featured') === 'false' ? false : null;
    const status = searchParams.get('status');
    const publishStatus = searchParams.get('publishStatus');
    const sortBy = searchParams.get('sortBy') || 'newest';

    const db = await connectDB();

    if (db) {
      const filterQuery: any = {};

      if (publishStatus && publishStatus !== 'All') {
        filterQuery.publishStatus = publishStatus;
      } else if (!publishStatus) {
        // By default on public API, only show published properties unless admin requests all
        const admin = await getAdminFromCookies();
        if (!admin) {
          filterQuery.publishStatus = 'Published';
        }
      }

      if (query) {
        filterQuery.$or = [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { city: { $regex: query, $options: 'i' } },
          { address: { $regex: query, $options: 'i' } },
        ];
      }

      if (location && location !== 'All') {
        filterQuery.$or = [
          { city: { $regex: location, $options: 'i' } },
          { address: { $regex: location, $options: 'i' } },
          { state: { $regex: location, $options: 'i' } }
        ];
      }

      if (propertyType && propertyType !== 'All') {
        filterQuery.propertyType = propertyType;
      }

      if (listingType && listingType !== 'All') {
        filterQuery.listingType = listingType;
      }

      if (minPrice !== null || maxPrice !== null) {
        filterQuery.price = {};
        if (minPrice !== null) filterQuery.price.$gte = minPrice;
        if (maxPrice !== null) filterQuery.price.$lte = maxPrice;
      }

      if (bedrooms && bedrooms !== 'All') {
        if (bedrooms === '4+') {
          filterQuery.bedrooms = { $gte: 4 };
        } else {
          filterQuery.bedrooms = Number(bedrooms);
        }
      }

      if (bathrooms && bathrooms !== 'All') {
        filterQuery.bathrooms = Number(bathrooms);
      }

      if (furnishing && furnishing !== 'All') {
        filterQuery.furnishing = furnishing;
      }

      if (featured !== null) {
        filterQuery.featured = featured;
      }

      if (status && status !== 'All') {
        filterQuery.status = status;
      }

      let sortOption: any = { createdAt: -1 };
      if (sortBy === 'price_asc') sortOption = { price: 1 };
      if (sortBy === 'price_desc') sortOption = { price: -1 };
      if (sortBy === 'area_desc') sortOption = { area: -1 };
      if (sortBy === 'featured') sortOption = { featured: -1, createdAt: -1 };

      const properties = await Property.find(filterQuery).sort(sortOption);

      return NextResponse.json({
        success: true,
        count: properties.length,
        data: properties,
      });
    }

    // Fallback in-memory store filtering
    let properties: PropertyItem[] = memoryStore.getProperties();
    const admin = await getAdminFromCookies();

    // Unless admin specified or logged in, show only published
    if (!admin && (!publishStatus || publishStatus === 'Published')) {
      properties = properties.filter(p => p.publishStatus === 'Published');
    } else if (publishStatus && publishStatus !== 'All') {
      properties = properties.filter(p => p.publishStatus === publishStatus);
    }

    if (query) {
      const q = query.toLowerCase();
      properties = properties.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q)
      );
    }

    if (location && location !== 'All') {
      const loc = location.toLowerCase();
      properties = properties.filter(p =>
        p.city.toLowerCase().includes(loc) ||
        p.address.toLowerCase().includes(loc) ||
        p.state.toLowerCase().includes(loc)
      );
    }

    if (propertyType && propertyType !== 'All') {
      properties = properties.filter(p => p.propertyType === propertyType);
    }

    if (listingType && listingType !== 'All') {
      properties = properties.filter(p => p.listingType === listingType);
    }

    if (minPrice !== null) {
      properties = properties.filter(p => p.price >= minPrice);
    }

    if (maxPrice !== null) {
      properties = properties.filter(p => p.price <= maxPrice);
    }

    if (bedrooms && bedrooms !== 'All') {
      if (bedrooms === '4+') {
        properties = properties.filter(p => p.bedrooms >= 4);
      } else {
        properties = properties.filter(p => p.bedrooms === Number(bedrooms));
      }
    }

    if (bathrooms && bathrooms !== 'All') {
      properties = properties.filter(p => p.bathrooms === Number(bathrooms));
    }

    if (furnishing && furnishing !== 'All') {
      properties = properties.filter(p => p.furnishing === furnishing);
    }

    if (featured !== null) {
      properties = properties.filter(p => p.featured === featured);
    }

    if (status && status !== 'All') {
      properties = properties.filter(p => p.status === status);
    }

    // Sort properties
    properties = [...properties].sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'area_desc') return b.area - a.area;
      if (sortBy === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return NextResponse.json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

// POST create property (Admin Protected)
export async function POST(request: Request) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized admin access required' }, { status: 401 });
    }

    const body = await request.json();

    if (!body.title || !body.propertyType || !body.city) {
      return NextResponse.json({ error: 'Missing required property fields: Title, Property Type, or City' }, { status: 400 });
    }

    const db = await connectDB();

    const slug = (body.title || 'property')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Math.floor(Math.random() * 10000);

    const propertyData = {
      ...body,
      slug,
      price: Number(body.price),
      bedrooms: Number(body.bedrooms || 0),
      bathrooms: Number(body.bathrooms || 0),
      area: Number(body.area || 0),
      featured: Boolean(body.featured),
      coverImage: body.coverImage || (body.images?.[0] || ''),
      videos: Array.isArray(body.videos) ? body.videos : body.videoUrl ? [{ url: body.videoUrl, title: 'Property Video Tour' }] : [],
    };

    if (db) {
      const newDoc = await Property.create(propertyData);
      return NextResponse.json({ success: true, data: newDoc }, { status: 201 });
    }

    const createdMemory = memoryStore.addProperty(propertyData);
    return NextResponse.json({ success: true, data: createdMemory }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
