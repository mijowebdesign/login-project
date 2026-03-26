import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Povezano sa MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Greška pri povezivanju na MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
