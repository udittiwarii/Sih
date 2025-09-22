import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const {user} = useAuth()
  const username = { name: "John Doe", email: "john@example.com", role: "citizen" };

  return (
    <div className="min-h-screen px-6 py-12 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Profile</h2>
        <p><strong>Name:</strong> {user.name || username.name}</p>
        <p><strong>Email:</strong> {user.email || username.email}</p>
        <p><strong>Role:</strong> {user.role || username.role}</p>
      </div>
    </div>
  );
}
