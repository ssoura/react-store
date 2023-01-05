import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import Layout from "./components/Layout";
// import UserListPage from "./pages/UserListPage";
// import UserEditPage from "./pages/UserEditPage";
// import ProductListPage from "./pages/ProductListPage";
// import ProductEditPage from "./pages/ProductEditPage";
// import OrderListPage from "./pages/OrderListPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="order/:id" element={<OrderPage />} />
          <Route path="shipping" element={<ShippingPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="placeorder" element={<PlaceOrderPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="cart/:id" element={<CartPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// {
//   /* <Route path="/admin/userlist" element={<UserListPage />} /> */
// }
// {
//   /* <Route path="/admin/user/:id/edit" element={<UserEditPage />} /> */
// }
// {
//   /* <Route path="/admin/productlist" element={<ProductListPage />} /> */
// }
// {
//   /* <Route
//   path="/admin/productlist/:pageNumber"
//   element={<ProductListPage />}
// /> */
// }
// {
//   /* <Route
//   path="/admin/product/:id/edit"
//   element={<ProductEditPage />}
// /> */
// }
// {
//   /* <Route path="/admin/orderlist" element={<OrderListPage />} /> */
// }
// {
//   /* <Route path="/search/:keyword" element={<HomePage />} /> */
// }
// {
//   /* <Route path="/page/:pageNumber" element={<HomePage />} /> */
// }
// {
//   /* <Route
//   path="/search/:keyword/page/:pageNumber"
//   element={HomePage}
// /> */
// }
