import mongoose from 'mongoose';

let isConnected = false; 

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    
    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // If using Mongoose 6.x, these are default and don't need to be specified
            serverSelectionTimeoutMS: 5000,  // Timeout after 5 seconds if server is not responding
            socketTimeoutMS: 45000,  // Close sockets after 45 seconds of inactivity
        });
        isConnected = true;
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw new Error('Failed to connect to the database');
    }
};
