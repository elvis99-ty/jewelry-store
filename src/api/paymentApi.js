import api from "./api";

export const initializePayment = async (paymentData) => {
  const response = await api.post(
    "/payment/initialize",
    paymentData
  );

  return response.data;
};

export const verifyPayment = async (reference) => {
  const response = await api.get(
    `/payment/verify/${reference}`
  );

  return response.data;
};