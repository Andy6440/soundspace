import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@soundspace.cgttsp6.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

/**
 * Connects to the MongoDB database.
 * @returns A boolean indicating whether the connection was successful.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      ssl: true,
      tlsAllowInvalidCertificates: false,
      tlsAllowInvalidHostnames: false,
    });
    return true;
  } catch (error) {
    return false;
  }
};

const ping = async () => {
  return mongoose.connection.readyState === 1;
};

export { connectDB, ping };
