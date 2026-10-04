import api from "./api";

export const adminLogin = async (email, password) => {
    const response = await api.post("admin/login", {email, password});

    return response.data;
};