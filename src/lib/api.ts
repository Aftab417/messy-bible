import apiClient from './interceptor';

// Types for API responses
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}

export interface LogoutResponse {
  message: string;
}

export interface User {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  is_verified: boolean;
  is_active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Authentication API functions
export const authApi = {
  // Admin login
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post('/admin/login', credentials);
    return response.data;
  },

  // Get user profile (you might need this later)
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get('/admin/profile');
    return response.data;
  },

  // Logout
  logout: async (): Promise<LogoutResponse> => {
    const response = await apiClient.post('/admin/logout');
    return response.data;
  }
};

export default authApi;
