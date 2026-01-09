const mongoose = require("mongoose");

const MONGODB_URI = process.env.DB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define DB_URI in environment variables");
}

// Global is preserved across Vercel function invocations
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToMongo() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,   // IMPORTANT
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectToMongo;
