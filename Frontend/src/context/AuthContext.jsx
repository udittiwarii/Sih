import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Always fetch current user
  const fetchUserProfile = async () => {
    try {
      const res = await API.get("/auth/me", { withCredentials: true });

      if (res.data) {
        // backend should return something like: { id, name, email, role }
        
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const login = async (formData) => {
    const res = await API.post("/auth/login", formData, { withCredentials: true });
    await fetchUserProfile(); // refresh user after login
    return res.data;
  };

  const register = async (formData) => {
    const res = await API.post("/auth/register", formData, { withCredentials: true });
    await fetchUserProfile(); // refresh user after register
    return res.data;
  };

  const logout = async () => {
    await API.post("/auth/logout", {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
