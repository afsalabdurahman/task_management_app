import { toast } from "react-toastify";
import api from "../services/axios";
import { ROUTES } from "../services/contants";

export const signupApi = async (userData) => {
  try {
    const response = await api.post(ROUTES.Auth.REGISTER, userData);
    return response.data;
  } catch (error) {
    console.error("Signup API error:", error.response ? error.response.data : error.message);
    throw error.response.data;
  }
};

export const login = async (credentials) => {
  try {
    console.log("Login API called with credentials:", credentials);
    const response = await api.post(ROUTES.Auth.LOGIN, credentials);
    console.log("Login API response:", response.data);
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