import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order, thunkAPI) => {
    try {
      const {
        user: { userInfo },
      } = thunkAPI.getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/orders`, order, config);

      // dispatch({
      //   type: CART_CLEAR_ITEMS,
      //   payload: data,
      // });
      localStorage.removeItem("cartItems");
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (id, thunkAPI) => {
    try {
      const {
        user: { userInfo },
      } = thunkAPI.getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/orders/${id}`, config);

      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const payOrder = createAsyncThunk(
  "order/payOrder",
  async ({ orderId, paymentResult }, thunkAPI) => {
    try {
      const {
        userLogin: { userInfo },
      } = thunkAPI.getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const deliverOrder = createAsyncThunk(
  "order/deliverOrder",
  async (order, thunkAPI) => {
    try {
      const {
        userLogin: { userInfo },
      } = thunkAPI.getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${order._id}/deliver`,
        {},
        config
      );

      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const listMyOrders = createAsyncThunk(
  "order/listMyOrders",
  async (thunkAPI) => {
    try {
      const {
        userLogin: { userInfo },
      } = thunkAPI.getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/orders/myorders`, config);

      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const listOrders = createAsyncThunk(
  "order/listOrders",
  async (thunkAPI) => {
    try {
      const {
        userLogin: { userInfo },
      } = thunkAPI.getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/orders`, config);
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  orderItems: [],
  shippingAddress: {},
  orders: [],
  error: null,
  success: null,
  create: {
    loading: false,
    success: null,
    order: null,
    error: null,
  },
  detail: {
    loading: true,
    order: null,
    success: null,
    error: null,
  },
  pay: {
    order: null,
    success: null,
    error: null,
  },
  deliver: {
    order: null,
    success: null,
    error: null,
  },
  mylist: {
    loading: null,
    error: null,
    orders: [],
  },
  list: {
    loading: null,
    error: null,
    orders: [],
  },
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    createOrderReset: (state, action) => {
      state = {};
    },
    PayOrderReset: (state, action) => {
      state = {};
    },
    deliverOrderReset: (state, action) => {
      state = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state, action) => {
        state.create.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.create.loading = false;
        state.create.success = true;
        state.create.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.create.loading = false;
        state.create.error = action.payload;
      });

    builder
      .addCase(getOrderDetails.pending, (state, action) => {
        state.detail.loading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.detail.loading = false;
        state.detail.success = true;
        state.detail.order = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.detail.loading = false;
        state.detail.error = action.payload;
      });

    builder
      .addCase(payOrder.pending, (state, action) => {
        state.pay.loading = true;
      })
      .addCase(payOrder.fulfilled, (state, action) => {
        state.pay.loading = false;
        state.pay.success = true;
      })
      .addCase(payOrder.rejected, (state, action) => {
        state.pay.loading = false;
        state.pay.error = action.payload;
      });

    builder
      .addCase(deliverOrder.pending, (state, action) => {
        state.deliver.loading = true;
      })
      .addCase(deliverOrder.fulfilled, (state, action) => {
        state.deliver.loading = false;
        state.deliver.success = true;
      })
      .addCase(deliverOrder.rejected, (state, action) => {
        state.deliver.loading = false;
        state.deliver.error = action.payload;
      });

    builder
      .addCase(listMyOrders.pending, (state, action) => {
        state.mylist.loading = true;
      })
      .addCase(listMyOrders.fulfilled, (state, action) => {
        state.mylist.loading = false;
        state.mylist.orders = action.payload;
      })
      .addCase(listMyOrders.rejected, (state, action) => {
        state.mylist.loading = false;
        state.mylist.error = action.payload;
      });
    builder
      .addCase(listOrders.pending, (state, action) => {
        state.list.loading = true;
      })
      .addCase(listOrders.fulfilled, (state, action) => {
        state.list.loading = false;
        state.list.orders = action.payload;
      })
      .addCase(listOrders.rejected, (state, action) => {
        state.list.loading = false;
        state.list.error = action.payload;
      });
  },
});
export const { PayOrderReset } = orderSlice.actions;
export default orderSlice.reducer;
