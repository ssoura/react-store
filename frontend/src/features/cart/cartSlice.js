import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import cartService from "./cartService";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cartItems: cartItemsFromStorage,
  shippingAddress: shippingAddressFromStorage,
  paymentMethod: null,
};

//actions

export const addToCart = createAsyncThunk(
  "user/addToCart",
  async (data, thunkAPI) => {
    console.log("sabkhcakfhclwk", data);
    try {
      return await cartService.addToCart(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const saveShippingAddress = createAsyncThunk(
  "cart/saveShippingAddress",
  async (data) => {
    console.log("cbvwbdiewbdfkweb");
    localStorage.setItem("shippingAddress", JSON.stringify(data));
    return data;
  }
);

export const savePaymentMethod = createAsyncThunk(
  "cart/savePaymentMethod",
  async (data) => {
    localStorage.setItem("paymentMethod", JSON.stringify(data));
    return data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x.product !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearItem: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      const item = action.payload;
      console.log(item);
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        state.cartItems.map((x) =>
          x.product === existItem.product
            ? state.cartItems.push(x)
            : state.cartItems.push(item)
        );
      } else {
        state.cartItems.push(item);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    });
    builder.addCase(saveShippingAddress.fulfilled, (state, action) => {
      state.shippingAddress = action.payload;
    });
    builder.addCase(savePaymentMethod.fulfilled, (state, action) => {
      state.paymentMethod = action.payload;
    });
  },
});

export const { removeFromCart, clearItem } = cartSlice.actions;
export default cartSlice.reducer;
