// User interface defining the structure of a user object
export interface User {
  _id: string; // MongoDB unique identifier
  username: string; // User's display name
  email: string; // User's email address
  role: "super_admin" | "admin" | "user"; // User's role in the system
  token: string; // JWT authentication token
}

// Data required for user registration
export interface RegisterData {
  username: string;
  email: string;
  password: string;
  role?: "super_admin" | "admin" | "user"; // Optional role, defaults to 'user'
}

// Data required for user login
export interface LoginData {
  email: string;
  password: string;
}
