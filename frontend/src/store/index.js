import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./slices/productSlice";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export default store;

export * from "./thunks/cart";
export * from "./thunks/order";
export * from "./thunks/product";
export * from "./thunks/user";
