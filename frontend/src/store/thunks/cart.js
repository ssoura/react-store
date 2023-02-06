import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const addToCart = async ({ productId, qty }) => {
//   const { data } = await axios.get(`${import.meta.env.VITE_APP_API}/api/products/${productId}`);
//   console.log("xxxxxxxx", data);

//   //   dispatch({
//   //     type: CART_ADD_ITEM,
//   //     payload: {
//   //       product: data._id,
//   //       name: data.name,
//   //       image: data.image,
//   //       price: data.price,
//   //       countInStock: data.countInStock,
//   //       qty,
//   //     },
//   //   });

//   const item = {
//     product: data._id,
//     name: data.name,
//     image: data.image,
//     price: data.price,
//     countInStock: data.countInStock,
//     qty,
//   };
//   return item;
// };

//actions

export const addToCart = createAsyncThunk(
  "user/addToCart",
  async ({ productId, qty }, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/products/${productId}`
      );
      console.log("xxxxxxxx", data);

      //   dispatch({
      //     type: CART_ADD_ITEM,
      //     payload: {
      //       product: data._id,
      //       name: data.name,
      //       image: data.image,
      //       price: data.price,
      //       countInStock: data.countInStock,
      //       qty,
      //     },
      //   });

      const item = {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      };
      return item;
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
