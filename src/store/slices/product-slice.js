import { createSlice } from '@reduxjs/toolkit';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../../apis/productsApis';

const initialState = {
  products: [],
  isFetchingProducts: false,
  error: ""
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isFetchingProducts = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isFetchingProducts = false;
        state.products = action.payload;
        state.error = "";
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isFetchingProducts = false;
        state.error = action.error.message;
      });
    builder
      .addCase(updateProduct.pending, (state, action) => {
        state.isFetchingProducts = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isFetchingProducts = false;
        state.error = "";
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isFetchingProducts = false;
        state.error = action.error.message;
      });
    builder
      .addCase(createProduct.pending, (state, action) => {
        state.isFetchingProducts = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isFetchingProducts = false;
        state.error = "";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isFetchingProducts = false;
        state.error = action.error.message;
      });
    builder
      .addCase(deleteProduct.pending, (state, action) => {
        state.isFetchingProducts = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isFetchingProducts = false;
        state.error = "";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isFetchingProducts = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
