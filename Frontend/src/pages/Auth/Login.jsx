import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import API from "../../api/axios";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    await login(form); // ✅ this will also call fetchUserProfile()
    toast.success("Login successful!");

    // Redirect using context user instead of backend login response
    if (user?.role === "citizen") navigate("/citizen/dashboard");
    else if (user?.role === "worker") navigate("/worker/dashboard");
    else if (user?.role === "admin") navigate("/admin/dashboard");
  } catch (err) {
    toast.error(err.response?.data?.message || "Login failed!");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-3 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-3 mb-4 border rounded"
        />
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-3 rounded">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <Toaster />
    </div>
  );
}
