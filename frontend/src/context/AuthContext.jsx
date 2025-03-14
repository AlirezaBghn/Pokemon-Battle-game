import { createContext, useContext, useState, useEffect } from "react";
import { backendAPI } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ Prevent UI flickering

  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log("🔍 Checking session...");
        const res = await backendAPI.get("/api/check-session", {
          withCredentials: true, // ✅ Ensure cookies are sent
        });

        console.log("✅ Session check response:", res.data);
        setIsAuthenticated(res.data.authenticated);
      } catch (error) {
        console.error("❌ Session check failed:", error.response?.data || error.message);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
