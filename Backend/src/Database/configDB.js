// Configuring Mongodb using mongoose ODM here
// Imports
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// DB URI
const uri = process.env.DB_URL;

// Connection here
const connectToDB = async () => {
  try {
    await mongoose.connect(uri, {
      family: 4,
    });
    console.log("Database connected!");
  } catch (error) {
    console.log("Something went wrong while connecting to db! " + error);
  }
};

// Exporting here
export default connectToDB;
