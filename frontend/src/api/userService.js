import axiosClient from "./axiosClient";

const userService = {
  // User registration
  signUp: async (userData) => {
    const response = await axiosClient.post("/user/register", userData);
    return response.data;
  },

  // User login
  login: async (credentials) => {
    const response = await axiosClient.post("/user/login", credentials);
    return response.data;
  },
};

export default userService;
