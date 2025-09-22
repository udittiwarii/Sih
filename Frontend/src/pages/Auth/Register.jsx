import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import API from "../../api/axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "citizen",
    workerKey: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If role changes, clear workerKey if not worker
    if (name === "role" && value !== "worker") {
      setForm((prev) => ({ ...prev, role: value, workerKey: "" }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/register", form);
      toast.success(res.data.message || "Registration successful!");
      setTimeout(() => {
        if(res.role  === 'worker')navigate("/worker/dashboard");
        else if(res.role) navigate('/admin/dashboard')
        else navigate('/citizen/dashboard')
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
          Create an Account
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          autoComplete="off"
        >
          <input
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={form.name}
          />
          <input
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            value={form.email}
          />
          <input
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
          />
          <select
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            name="role"
            onChange={handleChange}
            value={form.role}
          >
            <option value="citizen">Citizen</option>
            <option value="worker">Worker</option>
            <option value="admin">Admin</option>
          </select>
          {form.role === "worker" && (
            <input
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              name="workerKey"
              placeholder="Worker Key"
              onChange={handleChange}
              value={form.workerKey}
            />
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>

      {/* Toast Container */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
