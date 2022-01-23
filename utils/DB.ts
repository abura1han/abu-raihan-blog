import mongoose from "mongoose";

const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ldpb3.mongodb.net/xbu_ra1han?retryWrites=true&w=majority`;
export const dbConnection = async () => {
  try {
    await mongoose.connect(dbUrl);
  } catch (error) {
    throw error;
  }
};
