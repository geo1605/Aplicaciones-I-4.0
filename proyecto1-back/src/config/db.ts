import mongoose from "mongoose";

//user/pass
const mongoUri = "mongodb://localhost:27017/proyecto?authSource=admin";
 // ?authSource=admin
const mongoUriLocal = "mongodb://localhost:27017/proyecto"; // Local MongoDB URI
const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(mongoUri);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("MongoDB connection failed:", error);
    }
}
export default connectDB;