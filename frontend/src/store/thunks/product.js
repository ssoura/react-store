import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { logout } from "./userActions";

// export const deleteProduct = async (id) => {
//   const {
//     userLogin: { userInfo },
//   } = getState();

//   const config = {
//     headers: {
//       Authorization: `Bearer ${userInfo.token}`,
//     },
//   };

//   await axios.delete(`${import.meta.env.VITE_APP_API}/api/products/${id}`, config);
// };

// export const listProducts = async ({ keyword = "", pageNumber = "" }) => {
//   const { data } = await axios.get(
//     `${import.meta.env.VITE_APP_API}/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
//   );

//   return data;
// };
export const productList = createAsyncThunk(
  "product/productList",
  async ({ keyword = "", pageNumber = "" }, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_APP_API
        }/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      return data;
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
// export const listProductDetails = async (id) => {
//   const { data } = await axios.get(`${import.meta.env.VITE_APP_API}/api/products/${id}`);
//   return data;
// };
export const productDetails = createAsyncThunk(
  "product/productDetails",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/products/${id}`
      );
      return data;
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

// export const createProduct = async () => {
//   const {
//     userLogin: { userInfo },
//   } = getState();

//   const config = {
//     headers: {
//       Authorization: `Bearer ${userInfo.token}`,
//     },
//   };

//   const { data } = await axios.post(`${import.meta.env.VITE_APP_API}/api/products`, {}, config);
//   return data;
// };

export const productCreate = createAsyncThunk(
  "product/productCreate",
  async (id, thunkAPI) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/products`,
        {},
        config
      );
      return data;
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

// export const updateProduct = async (product) => {
//   const {
//     userLogin: { userInfo },
//   } = getState();

//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${userInfo.token}`,
//     },
//   };

//   const { data } = await axios.put(
//     `${import.meta.env.VITE_APP_API}/api/products/${product._id}`,
//     product,
//     config
//   );
//   return data;
// };
export const productUpdate = createAsyncThunk(
  "product/productUpdate",
  async (product, thunkAPI) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${import.meta.env.VITE_APP_API}/api/products/${product._id}`,
        product,
        config
      );
      return data;
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

export const productDelete = createAsyncThunk(
  "product/productUpdate",
  async (id, thunkAPI) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(
        `${import.meta.env.VITE_APP_API}/api/products/${id}`,
        config
      );
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
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/products/top`
      );
      return data;
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

// export const createProductReview = async (productId, review) => {
//   const {
//     userLogin: { userInfo },
//   } = getState();

//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${userInfo.token}`,
//     },
//   };

//   await axios.post(`${import.meta.env.VITE_APP_API}/api/products/${productId}/reviews`, review, config);
// };
export const productReviewCreate = createAsyncThunk(
  "product/productReviewCreate",
  async (productId, review, thunkAPI) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        `${import.meta.env.VITE_APP_API}/api/products/${productId}/reviews`,
        review,
        config
      );
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
