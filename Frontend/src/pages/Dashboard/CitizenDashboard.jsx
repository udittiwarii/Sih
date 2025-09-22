import API from "../../api/axios";
import Navbar from "../../components/Dashboad/dashboardNavbar";
import ComplaintForm from "../../components/Dashboad/ComplaintForm";
import ComplaintCard from "../../components/Dashboad/ComplaintCard";
import RewardCard from "../../components/Dashboad/RewardCard";
import Loader from "../../components/common/Loader";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function CitizenDashboard() {
  const [activeTab, setActiveTab] = useState("Raise Complaint");
  const [complaints, setComplaints] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [complaintRes, rewardRes] = await Promise.all([
        API.get("/complaints/my"),
        API.get("/rewards/my"),
      ]);
      setComplaints(complaintRes.data);
      setRewards(rewardRes.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleComplaintRaised = (newComplaint) => {
    if (newComplaint?._id) {
      setComplaints([newComplaint, ...complaints]);
      setActiveTab("My Complaints");
      toast.success("Complaint raised successfully!");
    } else {
      toast.error("Failed to raise complaint. Try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      {loading && <Loader />}

      {!loading && activeTab === "Raise Complaint" && (
        <ComplaintForm onComplaintRaised={handleComplaintRaised} />
      )}

      {!loading && activeTab === "My Complaints" && (
        complaints.length === 0 ? (
          <p className="text-gray-500">
            You haven't raised any complaints yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {complaints.map((c) => (
              <ComplaintCard key={c._id} complaint={c} />
            ))}
          </div>
        )
      )}

      {!loading && activeTab === "Rewards" && <RewardCard rewards={rewards} />}
    </div>
  );
}
