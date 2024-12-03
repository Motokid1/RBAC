import axios from "axios";
import { API_URL } from "../config/env";
import type { RegisterData, LoginData, User } from "../types/auth";

// Configure axios defaults
axios.defaults.withCredentials = true;

// Login user with email and password
export const login = async ({ email, password }: LoginData): Promise<User> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
    throw error;
  }
};

// Register new user with provided data
export const register = async (userData: RegisterData): Promise<User> => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
    throw error;
  }
};

// Get list of users (admin/super_admin only)
export const getUsers = async (token: string): Promise<User[]> => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to fetch users");
    }
    throw error;
  }
};

// Delete user by ID (super_admin only)
export const deleteUser = async (
  userId: string,
  token: string
): Promise<{ message: string }> => {
  try {
    const response = await axios.delete(`${API_URL}/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to delete user");
    }
    throw error;
  }
};

// Update user profile
export const updateProfile = async (
  userData: { username: string; password?: string },
  token: string
): Promise<User> => {
  try {
    const response = await axios.put(`${API_URL}/users/profile`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to update profile"
      );
    }
    throw error;
  }
};
