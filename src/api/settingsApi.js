import api from "./api";

export const getStoreSettings = async () => {
  const response = await api.get("/settings");
  return response.data;
};

export const updateStoreSettings = async (settingsData) => {
  const token = sessionStorage.getItem("adminToken");
  const response = await api.put("/settings", settingsData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
