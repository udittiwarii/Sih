const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  citizen: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String },
  autoDescription: { type: String }, // optional AI-generated
  location: { type: String, required: true },
  imageUrl: { type: String },
  category: { type: String }, // AI result
  status: { type: String, enum: ["Pending", "Assigned", "In Progress", "Resolved", "Invalid"], default: "Pending" },
  assignedWorker: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  adminInstructions: { type: String },
  denialReason: { type: String },
  evidence: { type: String }, // worker's evidence URL
}, { timestamps: true });

module.exports = mongoose.model("Complaint", complaintSchema);
