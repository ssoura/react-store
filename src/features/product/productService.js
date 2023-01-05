import axios from "axios";
// import { logout } from "./userActions";

export const listProducts = async ({ keyword = "", pageNumber = "" }) => {
  const { data } = await axios.get(
    `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
  );

  return data;
};

export const listProductDetails = async (id) => {
  const { data } = await axios.get(`/api/products/${id}`);
  return data;
};

export const deleteProduct = async (id) => {
  const {
    userLogin: { userInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  await axios.delete(`/api/products/${id}`, config);
};

export const createProduct = async () => {
  const {
    userLogin: { userInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const { data } = await axios.post(`/api/products`, {}, config);
  return data;
};

export const updateProduct = async (product) => {
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
    `/api/products/${product._id}`,
    product,
    config
  );
  return data;
};

export const createProductReview = async (productId, review) => {
  const {
    userLogin: { userInfo },
  } = getState();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  await axios.post(`/api/products/${productId}/reviews`, review, config);
};

export const productTopRated = async () => {
  const { data } = await axios.get(`/api/products/top`);
  return data;
};

const productService = {
  listProducts,
  listProductDetails,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  productTopRated,
};
export default productService;
