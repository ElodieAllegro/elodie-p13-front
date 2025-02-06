import { createSlice } from "@reduxjs/toolkit";
import {
  getUserProfileThunk,
  setUserProfileThunk,
  signinThunk,
} from "../thunk";

const initialState = {
  firstName: "",
  lastName: "",
  token: localStorage.token,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signinThunk.pending, (state) => {
        state.state = "pending";
        state.errorMessage = null;
      })
      .addCase(signinThunk.fulfilled, (state, action) => {
        state.state = "fulfilled";
        state.token = action.payload.token;
        state.errorMessage = null;
      })
      .addCase(signinThunk.rejected, (state, action) => {
        state.state = "rejected";
        state.errorMessage = action.payload;
      });

    builder
      .addCase(getUserProfileThunk.pending, (state) => {
        // Add user to the state array
        state.state = "pending";
      })
      .addCase(getUserProfileThunk.fulfilled, (state, action) => {
        // Add user to the state array
        state.state = "fulfilled";
        state.firstName = action?.payload?.firstName;
        state.lastName = action?.payload?.lastName;
      })
      .addCase(getUserProfileThunk.rejected, (state, action) => {
        // Add user to the state array
        state.state = "rejected";
        state.error = action.error.message;
      });

    builder
      .addCase(setUserProfileThunk.pending, (state) => {
        // Add user to the state array
        state.state = "pending";
      })
      .addCase(setUserProfileThunk.fulfilled, (state, action) => {
        // Add user to the state array
        state.state = "fulfilled";
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
      })
      .addCase(setUserProfileThunk.rejected, (state, action) => {
        // Add user to the state array
        state.state = "rejected";
        state.error = action.error.message;
      });
  },
});

export const { setToken } = userSlice.actions;

export default userSlice.reducer;
