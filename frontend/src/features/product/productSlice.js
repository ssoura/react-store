import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

export const productList = createAsyncThunk(
  "product/productList",
  async ({ data }, thunkAPI) => {
    try {
      return await productService.listProducts({ data });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const productDetails = createAsyncThunk(
  "product/productDetails",
  async (id, thunkAPI) => {
    try {
      return await productService.listProductDetails(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const productCreate = createAsyncThunk(
  "product/productCreate",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const productUpdate = createAsyncThunk(
  "product/productUpdate",
  async (id, thunkAPI) => {
    try {
      return await productService.createProduct(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const productTopRated = createAsyncThunk(
  "product/productTopRated",
  async (thunkAPI) => {
    try {
      return await productService.productTopRated();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const productReviewCreate = createAsyncThunk(
  "product/productReviewCreate",
  async (productId, review, thunkAPI) => {
    try {
      return await productService.productReviewCreate(productId, review);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  products: [],
  loading: false,
  error: false,
  page: null,
  pages: null,
  topRated: [],
  product: { reviews: [] },
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
