import axios from "../config/axios";

export type UserRole = 'Admin' | 'Employee' | 'Manager';

export interface User {
  id: number;
  email: string;
  role: UserRole;
  // Add other relevant user properties here
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>(
      "/auth/login",
      credentials
    );
    return response.data;
  }

  async getProfile() {
    const response = await axios.get("/auth/profile");
    return response.data;
  }

  async logout() {
    // Clear auth token from cookies
    document.cookie =
      "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
}

export default new AuthService();
