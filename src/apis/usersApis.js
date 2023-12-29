import { API } from "../utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk(
  'getUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await API.POST(`/api/v1/user/login`, { email, password });
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const createUser = createAsyncThunk(
  'createUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await API.POST(`/api/v1/user`, { email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Signup failed');
    }
  }
);