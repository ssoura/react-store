import axios from "axios";
const addToCart = async ({ productId, qty }) => {
  const { data } = await axios.get(`/api/products/${productId}`);
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
};

const cartService = {
  addToCart,
};

export default cartService;
