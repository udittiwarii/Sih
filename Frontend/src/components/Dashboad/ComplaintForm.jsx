import React, { useState } from "react";
import API from "../../api/axios";

export default function ComplaintForm({ onComplaintRaised }) {
  const [form, setForm] = useState({ category: "", description: "", image: null });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("category", form.category);
      formData.append("description", form.description);
      if(form.image) formData.append("image", form.image);

      const res = await API.post("/complaints", formData, { headers: { "Content-Type": "multipart/form-data" }});
      onComplaintRaised(res.data);
      setForm({ category: "", description: "", image: null });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4 w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Category"
        value={form.category}
        onChange={e => setForm({...form, category: e.target.value})}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={e => setForm({...form, description: e.target.value})}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="file"
        onChange={e => setForm({...form, image: e.target.files[0]})}
        className="w-full"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Raise Complaint"}
      </button>
    </form>
  );
}
