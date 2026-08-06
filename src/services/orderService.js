import api from "../api/api";

export const getMyOrders = async (token) => {
  const response = await api.get("/orders/my-orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getOrderDetails = async (orderId, token) => {
  const response = await api.get(`/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};