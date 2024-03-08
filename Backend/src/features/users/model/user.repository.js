// User repository file to communicate with database
import User from "./user.schema.js";

// Creating user in the database
export const createUser = async (userData) => {
  try {
    const user = new User(userData);
    return await user.save();
  } catch (error) {
    throw new Error("Error creating user");
  }
};

// Finding user by email
export const findUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw new Error("Error finding user by email");
  }
};
