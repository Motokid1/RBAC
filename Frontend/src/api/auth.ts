// API configuration
const API_URL = "http://localhost:5000/api";

// Login user with email and password
// Returns user data with JWT token
export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
};

// Register new user with provided data
// Returns created user data with JWT token
export const register = async (userData: any) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

// Get list of users (admin/super_admin only)
// Requires valid JWT token
export const getUsers = async (token: string) => {
  const response = await axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Delete user by ID (super_admin only)
// Requires valid JWT token
export const deleteUser = async (userId: string, token: string) => {
  const response = await axios.delete(`${API_URL}/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update user profile (username and/or password)
// Requires valid JWT token
export const updateProfile = async (
  userData: { username: string; password?: string },
  token: string
) => {
  try {
    const response = await axios.put(`${API_URL}/users/profile`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
