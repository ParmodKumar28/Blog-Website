// User repository file to communicate with database
import ErrorHandler from "../../../utils/ErrorHandler.js";
import User from "./user.schema.js";

// Creating user in the database
export const createUser = async (userData) => {
  try {
    const user = new User(userData);
    return await user.save();
  } catch (error) {
    throw new ErrorHandler(400, "Error creating user");
  }
};

// Finding user by email
export const findUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw new ErrorHandler(400, "Error finding user by email");
  }
};
