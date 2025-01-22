export const BASE_URL =
  process.env.NODE_ENV === 'develeopment' ? 'http://localhost:4000' : 'https://react-shop-wqg0.onrender.com';
export const PRODUCTS_URL = BASE_URL+'/api/products';
export const USERS_URL = BASE_URL+'/api/users';
export const ORDERS_URL = BASE_URL+'/api/orders';
export const PAYPAL_URL = BASE_URL+'/api/config/paypal';
