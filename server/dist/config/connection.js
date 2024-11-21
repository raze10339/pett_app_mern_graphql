import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/pet_social_network_db');
export default mongoose.connection;
