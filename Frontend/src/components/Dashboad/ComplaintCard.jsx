import React from "react";
import ImageWithFallback from "../common/ImageWithFallback";

export default function ComplaintCard({ complaint }) {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col">
      <h4 className="font-semibold text-base md:text-lg">{complaint.category || "Uncategorized"}</h4>
      <p className="text-sm md:text-base text-gray-600 mt-1">{complaint.autoDescription || complaint.description}</p>
      <div className="mt-2 h-40 w-full">
        <ImageWithFallback src={complaint.imageUrl} alt="complaint" />
      </div>
      <div className="mt-2">
        <span className={`text-xs md:text-sm px-2 py-1 rounded ${
          complaint.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
          complaint.status === "Resolved" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
        }`}>
          {complaint.status}
        </span>
      </div>
    </div>
  );
}
