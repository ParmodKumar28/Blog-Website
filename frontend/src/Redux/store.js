// Creating store here for managing state's through reducer's
// Imports
import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./reducers/usersReducer";
import { blogsReducer } from "./reducers/blogsReducer";

// Store
const store = configureStore({
  // Reducer's
  reducer: {
    usersReducer,
    blogsReducer,
  },
});

// Export store
export default store;
