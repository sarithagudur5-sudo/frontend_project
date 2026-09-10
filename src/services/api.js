import axios from "axios";

const API_URL = "http://localhost:5000";

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(
    `${API_URL}/products/${id}`
  );

  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await axios.post(
    `${API_URL}/orders`,
    orderData
  );

  return response.data;
};

export const getOrders = async () => {
  const response = await axios.get(
    `${API_URL}/orders`
  );

  return response.data;
};