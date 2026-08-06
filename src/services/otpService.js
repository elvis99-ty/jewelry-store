import api from "../api/api";

export const sendOtp = async (email) => {
  const response = await api.post("/otp/send", {
    email,
  });

  return response.data;
};

export const verifyOtp = async (email, otp) => {
  const response = await api.post("/otp/verify", {
    email,
    otp,
  });

  return response.data;
};