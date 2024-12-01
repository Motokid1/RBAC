import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";

// Define the shape of our authentication context
interface AuthContextType {
  user: any; // Current user data
  login: (userData: any) => void; // Login function
  logout: () => void; // Logout function
  updateUser: (userData: any) => void; // Update user data
  isAuthenticated: boolean; // Authentication status
}

// Create the context with undefined default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component to wrap the app and provide authentication state
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State management
  const [user, setUser] = useState(null);
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

    // Set new timeout for 4 minutes
    const timeout = setTimeout(() => {
      logout();
      navigate("/login");
    }, 4 * 60 * 1000);

    setSessionTimeout(timeout);
  }, [sessionTimeout, navigate]);

  // Initialize auth state from localStorage and set up activity listeners
  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
      resetSessionTimeout();
    }

    // Setup activity monitoring
    const events = ["mousedown", "keydown", "scroll", "touchstart"];

    const resetOnActivity = () => {
      if (isAuthenticated) {
        resetSessionTimeout();
      }
    };

    // Add event listeners
    events.forEach((event) => {
      window.addEventListener(event, resetOnActivity);
    });

    // Cleanup function
    return () => {
      if (sessionTimeout) {
        clearTimeout(sessionTimeout);
      }
      events.forEach((event) => {
        window.removeEventListener(event, resetOnActivity);
      });
    };
  }, [resetSessionTimeout, isAuthenticated]);

  // Login function
  const login = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
    resetSessionTimeout();
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
    }
  };

  // Update user data function
  const updateUser = (userData: any) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // Provide auth context to children components
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
