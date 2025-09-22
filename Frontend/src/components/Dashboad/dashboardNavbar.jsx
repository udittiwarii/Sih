import React from "react";

export default function dashboardNavbar({ activeTab, setActiveTab }) {
  const tabs = ["Raise Complaint", "My Complaints", "Rewards"];
  
  return (
    <div className="flex overflow-x-auto space-x-4 border-b border-gray-200 p-4 mb-6">
      {tabs.map((tab, idx) => (
        <button
          key={idx}
          onClick={() => setActiveTab(tab)}
          className={`flex-shrink-0 px-4 py-2 rounded ${
            activeTab === tab ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
