import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  lastFailureTime?: number;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectDB(): Promise<typeof mongoose | null> {
  if (!MONGODB_URI) {
    // If no MONGODB_URI is specified in environment, return null so memoryStore fallback is used seamlessly
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  // If connection failed recently (within last 30 seconds), skip waiting and use fallback immediately
  if (cached.lastFailureTime && Date.now() - cached.lastFailureTime < 30000) {
    return null;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 1500, // Reduced from 5000ms to 1500ms for fast fallback
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      console.log('MongoDB Connected successfully.');
      cached.lastFailureTime = undefined;
      return m;
    }).catch((err) => {
      console.warn('MongoDB connection failed. Using fallback store.', err.message);
      cached.lastFailureTime = Date.now();
      return null as any;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    cached.lastFailureTime = Date.now();
    return null;
  }

  return cached.conn;
}
