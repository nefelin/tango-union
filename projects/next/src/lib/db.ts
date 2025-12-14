import mongoose from 'mongoose';

let cachedConnection: typeof mongoose | null = null;
let connectionPromise: Promise<typeof mongoose> | null = null;

export async function connectToDatabase() {
  // If already connected, return immediately
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  // If connection is in progress, return the existing promise
  if (connectionPromise) {
    return connectionPromise;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  // Create connection promise
  connectionPromise = (async () => {
    try {
      // Optimize connection options for speed in serverless
      cachedConnection = await mongoose.connect(uri, {
        maxPoolSize: 1, // Serverless functions only need 1 connection
        minPoolSize: 0, // Don't maintain idle connections
        serverSelectionTimeoutMS: 5000, // Fast fail if can't connect quickly
        socketTimeoutMS: 10000, // Socket timeout
        connectTimeoutMS: 5000, // Connection timeout - fail fast
        heartbeatFrequencyMS: 10000, // Check connection health
        bufferCommands: false, // Disable mongoose buffering - fail fast if not connected
        // Optimize for speed
        directConnection: false, // Use connection string's connection method
        retryWrites: true,
        retryReads: true,
      });

      console.log('MongoDB connected successfully, readyState:', mongoose.connection.readyState);
      return cachedConnection;
    } catch (error) {
      console.error('MongoDB connection error:', error);
      // Reset on error
      cachedConnection = null;
      connectionPromise = null;
      throw error;
    }
  })();

  return connectionPromise;
}

