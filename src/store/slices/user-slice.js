import { createSlice } from "@reduxjs/toolkit";
import { getUser, createUser } from "../../apis/usersApis";

const initialStates = {
  user: {},
  isFetching: false,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "users",
  initialState: initialStates,
  reducers: {
    logoutUser: (state) => {
      state.user = {};
      state.isFetching = false;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state, action) => {
      state.isFetching = true;
      state.user = action.payload;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isLoggedIn = true;
      state.user = action.payload;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.isFetching = false;
      state.isLoggedIn = false;
      state.user = {};
    });
    builder.addCase(createUser.pending, (state, action) => {
      state.isFetching = true;
      state.user = action.payload;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isLoggedIn = true;
      state.user = action.payload
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.isFetching = false;
      state.isLoggedIn = false;
      state.user = {};
    });
  }
})

export const { logoutUser } = userSlice.actions;
export default userSlice;