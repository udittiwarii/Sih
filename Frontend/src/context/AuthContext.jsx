import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user after login using existing API
  const fetchUserProfile = async () => {
    try {
      // Example logic: call citizen complaints endpoint for citizen
      const res = await API.get("/complaints/my"); 
      
      if (res.data && res.data.length > 0) {
        setUser({
          role: "citizen",
          data: res.data,
        });
      } else {
        // Fallback: if no complaints or admin/worker, try other endpoints
        // This is optional depending on backend
        setUser({ role: "admin", data: [] });
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
    const res = await API.post("/auth/login", formData); // existing login API
    await fetchUserProfile(); // fetch profile after login
    return res.data;
  };

  const register = async (formData) => {
    const res = await API.post("/auth/register", formData); // existing register API
    await fetchUserProfile(); 
    return res.data;
  };

  const logout = async () => {
    await API.post("/auth/logout"); // if exists, optional
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
