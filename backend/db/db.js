import mongoose from 'mongoose';
import getLogger from '../utilities/log.js';
import dotenv from 'dotenv';

dotenv.config();
const DB__BACKEND = process.env.DB__BACKEND;

const log = getLogger();

const connectDb = async (dbName = DB__BACKEND) => {
    log.info("Attempting to connect to MongoDB: " + process.env.MONGO_URI + ", database " + dbName + ".");
    return mongoose.connect(process.env.MONGO_URI + dbName, {});
};

export { connectDb };
