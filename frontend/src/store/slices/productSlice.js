import { createSlice } from "@reduxjs/toolkit";
import {
  productList,
  productDetails,
  productCreate,
  productUpdate,
  productDelete,
  productTopRated,
  productReviewCreate,
} from "../thunks/product";

const initialState = {
  products: [],
  loading: false,
  error: false,
  page: null,
  pages: null,
  topRated: [],
  product: { reviews: [] },
  reviewCreate: {
    loading: false,
    error: false,
    success: null,
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productList.pending, (state, action) => {
        state.loading = true;
        state.products = [];
      })
      .addCase(productList.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.pages = action.payload.pages;
        state.page = action.payload.page;
      })
      .addCase(productList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(productDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(productDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(productDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(productCreate.pending, (state, action) => {
        return { loading: true };
      })
      .addCase(productCreate.fulfilled, (state, action) => {
        return { loading: false, success: true, product: action.payload };
      })
      .addCase(productCreate.rejected, (state, action) => {
        return { loading: false, error: action.payload };
      });

    builder
      .addCase(productUpdate.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(productUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.product = action.payload;
      })
      .addCase(productUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(productDelete.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(productDelete.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(productDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(productReviewCreate.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(productReviewCreate.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(productReviewCreate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(productTopRated.pending, (state, action) => {
        state.loading = true;
        state.products = [];
      })
      .addCase(productTopRated.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(productTopRated.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = productSlice.actions;
export default productSlice.reducer;
