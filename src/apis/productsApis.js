import { API } from "../utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
  'getProducts',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await API.GET(`/api/v1/product/all/${userId}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Api failed while getting products');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'updateProduct',
  async ({ productId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await API.PUT(`/api/v1/product/${productId}`, updatedData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Api failed while updating product');
    }
  }
);

export const createProduct = createAsyncThunk(
  'createProduct',
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await API.POST(`/api/v1/product`, { ...payload });
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Api failed while creating product');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'deleteProduct',
  async ({ productId }, { rejectWithValue }) => {
    console.log("productId =>", productId)
    try {
      const response = await API.DELETE(`/api/v1/product/${productId}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Api failed while deleting product');
    }
  }
);