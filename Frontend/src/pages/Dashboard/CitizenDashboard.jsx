import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import ImageWithFallback from "../../components/common/ImageWithFallback";

export default function CitizenDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    API.get("/complaints/my")
      .then(res => setComplaints(res.data))
      .catch(()=>{})
      .finally(()=>setLoading(false));
  },[]);

  if(loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">My Complaints</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {complaints.map(c => (
          <div className="bg-white rounded shadow p-4" key={c._id}>
            <h4 className="font-semibold">{c.category || "Uncategorized"}</h4>
            <p className="text-sm text-gray-600">{c.autoDescription || c.description}</p>
            <div className="mt-2 h-40">
              <ImageWithFallback src={c.imageUrl} alt="complaint" />
            </div>
            <div className="mt-2">
              <span className="text-xs px-2 py-1 bg-gray-100 rounded">{c.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
