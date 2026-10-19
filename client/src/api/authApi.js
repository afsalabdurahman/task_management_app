import { toast } from "react-toastify";
import api from "../services/axios";
import { ROUTES } from "../services/contants";

export const signupApi = async (userData) => {
  try {
    const response = await api.post(ROUTES.Auth.REGISTER, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post(ROUTES.Auth.LOGIN, credentials);
    return response.data.user;
  } catch (error) {
    toast.error("Invalid user email or password" || "Login failed");
    throw error.response.data;
  }
};
export const logout = async () => {
  try {
    const response = await api.post(ROUTES.Auth.Logout);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getCurrentUser = async () => {
  try {
    const response = await api.get(ROUTES.Auth.CURRENT_USER);
    return response.data.user;
  } catch (error) {
    throw error.response.data;
  }
}