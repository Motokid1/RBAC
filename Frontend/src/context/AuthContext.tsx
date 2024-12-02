import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { SESSION_TIMEOUT } from "../config/env";
import type { User } from "../types/auth";

// Define the shape of our authentication context
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isAuthenticated: boolean;
}

// Create the context with undefined default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component to wrap the app and provide authentication state
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const navigate = useNavigate();

  // Reset session timeout when user is active
  const resetSessionTimeout = useCallback(() => {
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
    }

    // Set new timeout based on environment configuration
    const timeout = setTimeout(() => {
      logout();
      navigate("/login");
    }, SESSION_TIMEOUT);

    setSessionTimeout(timeout);
  }, [sessionTimeout, navigate]);

  // Initialize auth state from localStorage and set up activity listeners
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
      resetSessionTimeout();
    }

    const events = ["mousedown", "keydown", "scroll", "touchstart"];

    const resetOnActivity = () => {
      if (isAuthenticated) {
        resetSessionTimeout();
      }
    };

    events.forEach((event) => {
      window.addEventListener(event, resetOnActivity);
    });

    return () => {
      if (sessionTimeout) {
        clearTimeout(sessionTimeout);
      }
      events.forEach((event) => {
        window.removeEventListener(event, resetOnActivity);
      });
    };
  }, [resetSessionTimeout, isAuthenticated]);

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
    resetSessionTimeout();
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
    }
  };

  const updateUser = (userData: Partial<User>) => {
    const updatedUser = { ...user, ...userData } as User;
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, updateUser, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
