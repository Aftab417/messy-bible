import store from "@/redux";
import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";
import { toast } from "react-hot-toast";
import LogoutService from "./logoutService";

type ErrorResponse = {
  message?: string;
  statusCode?: number;
};

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "https://bible.alrightech.com/api",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = store.getState().user?.accessToken || store.getState().user?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ErrorResponse>) => {
    if (error.response) {
      const { status, data } = error.response;
      const errorMessage = data?.message || getDefaultErrorMessage(status);

      // Don't show toast for logout endpoint errors
      if (!error.config?.url?.includes('/admin/logout')) {
        toast.error(errorMessage);
      }

      if (status === 401) {
        // Check if this is not a logout request to avoid infinite loops
        if (!error.config?.url?.includes('/admin/logout')) {
          // Force logout for unauthorized access
          await LogoutService.forceLogout('Session expired. Please log in again.');
        }
        return Promise.reject({ ...error, isUnauthorized: true });
      }
    } else {
      toast.error("Network error. Please check your connection.");
    }

    return Promise.reject(error);
  }
);

// Helper for default error messages
const getDefaultErrorMessage = (status?: number) => {
  switch (status) {
    case 401:
      return "Session expired. Please log in again.";
    case 403:
      return "You do not have permission to access this resource.";
    case 404:
      return "The requested resource was not found.";
    case 429:
      return "Too many requests. Please slow down.";
    case 500:
      return "Internal server error. Please try again later.";
    default:
      return "An unexpected error occurred.";
  }
};

export default apiClient;
