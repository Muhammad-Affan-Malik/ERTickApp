import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

// Define the shape of our authentication context
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  user: { username: string } | null;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component that wraps the app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<{ username: string } | null>(null);

  // Check localStorage for existing session on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedUser = localStorage.getItem("user");
    
    if (storedAuth === "true" && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
    
    // Mark loading as complete
    setIsLoading(false);
  }, []);

  /**
   * Login function - validates credentials and updates auth state
   * @param username - User's username
   * @param password - User's password
   * @returns Promise<boolean> - true if login successful, false otherwise
   */
  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Hardcoded credentials validation
    const VALID_USER_ID = "1111";
    const VALID_PASSWORD = "1111";
    
    if (username === VALID_USER_ID && password === VALID_PASSWORD) {
      // Successful login
      const userData = { username: username.trim() };
      
      setIsAuthenticated(true);
      setUser(userData);
      
      // Persist auth state in localStorage
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(userData));
      
      return true;
    }
    
    // Failed login
    return false;
  };

  /**
   * Logout function - clears auth state and localStorage
   */
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    
    // Clear localStorage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  };

  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

