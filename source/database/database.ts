import dotenv from 'dotenv';
import { MongoClient } from "mongodb";

dotenv.config();
export const client = new MongoClient(process.env.MONGO_URI || "");
