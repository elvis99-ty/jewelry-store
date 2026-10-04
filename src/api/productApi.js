import api from "./api";

export const getProducts = async (category) => {
  const response = await api.get("/products", {
    params: category ? { category } : {},
  });

  return response.data.products.map((p) => ({
    ...p,
    id: p._id,
  }));
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

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);

  return {
    ...response.data.product,
    id: response.data.product._id,
  };
};