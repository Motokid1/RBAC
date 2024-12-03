import axios from 'axios';
import { API_URL } from '../config/env';
import type { RegisterData, LoginData, User } from '../types/auth';

// Login user with email and password
// Returns user data with JWT token
export const login = async ({ email, password }: LoginData): Promise<User> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    // Properly handle and throw API errors
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
    throw error;
  }
};

// Register new user with provided data
// Returns created user data with JWT token
export const register = async (userData: RegisterData): Promise<User> => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
    throw error;
  }
};

// Get list of users (admin/super_admin only)
// Requires valid JWT token
export const getUsers = async (token: string): Promise<User[]> => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch users');
    }
    throw error;
  }
};

// Delete user by ID (super_admin only)
// Requires valid JWT token
export const deleteUser = async (userId: string, token: string): Promise<{ message: string }> => {
  try {
    const response = await axios.delete(`${API_URL}/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to delete user');
    }
    throw error;
  }
};

// Update user profile (username and/or password)
// Requires valid JWT token
export const updateProfile = async (
  userData: { username: string; password?: string }, 
  token: string
): Promise<User> => {
  try {
    const response = await axios.put(
      `${API_URL}/users/profile`,
      userData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
    throw error;
  }
};