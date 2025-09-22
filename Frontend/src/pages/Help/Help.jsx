export default function Help() {
  return (
    <div className="min-h-screen px-6 py-12 bg-white">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Help Center</h2>
      <ul className="space-y-4 text-gray-700">
        <li>📌 How to register? → Go to Register page and create an account.</li>
        <li>📌 How to report waste? → Login as Citizen, open your dashboard, and submit.</li>
        <li>📌 How to view assigned tasks? → Login as Worker/Admin.</li>
      </ul>
    </div>
  );
}
