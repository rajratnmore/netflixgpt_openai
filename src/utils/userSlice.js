import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    updateUser: (state, action) => {
      // Check if user exists and action payload contains updated information
      if (state && action.payload) {
        // Update user information
        state.displayName = action.payload.displayName;
        state.userImage = action.payload.userImage;
        // Add any additional fields you want to update
      }
    },
    removeUser: () => {
      return null;
    },
  },
});

export const { addUser, updateUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
