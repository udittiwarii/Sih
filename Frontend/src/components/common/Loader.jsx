import React from "react";

export default function Loader({ full = false }) {
  // simple spinner + backdrop
  return (
    <div className={full ? "fixed inset-0 flex items-center justify-center bg-white/70 z-50" : "flex items-center justify-center"}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
    </div>
  );
}
