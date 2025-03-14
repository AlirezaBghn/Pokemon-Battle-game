import { createContext, useContext, useState, useEffect } from "react";
import { backendAPI } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // On mount, check the session by calling our backend
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await backendAPI.get("/api/check-session");
        setIsAuthenticated(res.data.authenticated);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
