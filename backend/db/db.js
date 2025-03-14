import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Ì¥ó Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("‚úÖ MongoDB connected successfully");
  } catch (error) {
    console.error(`‚ùå Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

