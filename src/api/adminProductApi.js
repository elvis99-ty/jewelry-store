import api from "./api";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
  },
});

export const getAllProductsAdmin = async () => {
  const response = await api.get("/products/admin/all-products", authHeader());
  return response.data;
};

export const updateProductAdmin = async (id, productData) => {
  const response = await api.put(`/products/${id}`, productData, authHeader());
  return response.data;
};

export const deleteProductAdmin = async (id) => {
  const response = await api.delete(`/products/${id}`, authHeader());
  return response.data;
};

export const uploadProductImage = async (file) => {
  const token = sessionStorage.getItem("adminToken");

  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post("/upload", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const createProductAdmin = async (productData) => {
  const response = await api.post("/products", productData, authHeader());
  return response.data;
};