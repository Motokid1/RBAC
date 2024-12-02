import axios from "axios";
import { API_URL } from "../config/env";
import type { RegisterData, LoginData, User } from "../types/auth";

// Login user with email and password
// Returns user data with JWT token
export const login = async (credentials: LoginData): Promise<User> => {
  try {
    console.log("API_URL:", API_URL); // Debugging the API URL
    console.log("Login Credentials:", credentials); // Debugging credentials
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    console.log("Login Response:", response.data); // Debugging response
    return response.data;
  } catch (error: any) {
    console.error("Login Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to login. Check credentials."
    );
  }
};

// Register new user with provided data
// Returns created user data with JWT token
export const register = async (userData: RegisterData): Promise<User> => {
  try {
    console.log("Register Data:", userData); // Debugging user data
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    console.log("Register Response:", response.data); // Debugging response
    return response.data;
  } catch (error: any) {
    console.error("Register Error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to register user."
    );
  }
};

// Get list of users (admin/super_admin only)
// Requires valid JWT token
export const getUsers = async (token: string): Promise<User[]> => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error("Get Users Error:", error.response?.data || error.message);
    throw new Error("Failed to fetch users.");
  }
};

// Delete user by ID (super_admin only)
// Requires valid JWT token
export const deleteUser = async (
  userId: string,
  token: string
): Promise<{ message: string }> => {
  try {
    const response = await axios.delete(`${API_URL}/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error("Delete User Error:", error.response?.data || error.message);
    throw new Error("Failed to delete user.");
  }
};

// Update user profile (username and/or password)
// Requires valid JWT token
export const updateProfile = async (
  userData: { username: string; password?: string },
  token: string
): Promise<User> => {
  try {
    console.log("Update Profile Data:", userData); // Debugging profile data
    const response = await axios.put(`${API_URL}/users/profile`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Update Profile Error:",
      error.response?.data || error.message
    );
    throw new Error("Failed to update profile.");
  }
};
