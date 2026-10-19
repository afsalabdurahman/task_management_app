import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
         localStorage.removeItem("user"); // Clear user data from localStorage
          // Example:
           window.location.href = "/login";
          break;

        case 403:
          console.log("Forbidden");
          break;

        case 404:
          console.log("Not Found");
          break;

        case 500:
          console.log("Internal Server Error");
          break;
          
      }
    }

    return Promise.reject(error);
  }
);
export default api;