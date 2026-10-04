import api from "./api";

export const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);

  return response.data;
};

export const updateOrderStatus = async (orderId, orderStatus) => {
  const token = sessionStorage.getItem("adminToken");

  const response = await api.patch(
    `/orders/admin/${orderId}/status`,
    { orderStatus },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getAllOrders = async () => {
  const token = sessionStorage.getItem("adminToken");

  const response = await api.get("/orders/admin/all-orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};