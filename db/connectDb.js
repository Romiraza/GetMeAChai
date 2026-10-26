import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/Chai");

        console.log(`MongoDB Connected: ${conn.connection.host}`);

        return conn;
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        throw error;
    }
};

export default connectDb;