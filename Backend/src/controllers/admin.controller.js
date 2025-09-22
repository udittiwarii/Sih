// controllers/admin.controller.js
const Complaint = require("../Models/complaint.model");
const User = require("../Models/user.model");

// Get all complaints (admin)
exports.getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find().populate("citizen assignedWorker").sort({ createdAt: -1 });
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch complaints", error: err.message });
    }
};

// Validate/Invalidate complaint
exports.validateComplaint = async (req, res) => {
    try {
        const { id } = req.params;
        const { valid } = req.body; // boolean
        const complaint = await Complaint.findById(id);
        if (!complaint) return res.status(404).json({ message: "Complaint not found" });

        if (!valid) {
            complaint.status = "Invalid";
            await complaint.save();
            return res.json({ message: "Complaint marked invalid", complaint });
        }
        // keep as Pending until assigned
        complaint.status = "Pending";
        await complaint.save();
        return res.json({ message: "Complaint validated", complaint });
    } catch (err) {
        res.status(500).json({ message: "Validation failed", error: err.message });
    }
};

// Assign to worker
exports.assignToWorker = async (req, res) => {
    try {
        const { id } = req.params; // complaint id
        const { workerId, instructions } = req.body;
        const worker = await User.findById(workerId);
        if (!worker || worker.role !== "worker") return res.status(400).json({ message: "Invalid worker" });

        const complaint = await Complaint.findByIdAndUpdate(
            id,
            { assignedWorker: workerId, status: "Assigned", adminInstructions: instructions },
            { new: true }
        ).populate("citizen assignedWorker");

        res.json({ message: "Assigned to worker", complaint });
    } catch (err) {
        res.status(500).json({ message: "Assignment failed", error: err.message });
    }
};

// Block user
exports.blockUser = async (req, res) => {
    try {
        const { id } = req.params; // user id
        const user = await User.findByIdAndUpdate(id, { blocked: true }, { new: true });
        res.json({ message: "User blocked", user });
    } catch (err) {
        res.status(500).json({ message: "Block failed", error: err.message });
    }
};

// Reward user points
exports.rewardUser = async (req, res) => {
    try {
        const { id } = req.params; // user id
        const { points } = req.body;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        user.points = (user.points || 0) + (Number(points) || 0);
        await user.save();
        res.json({ message: "User rewarded", user });
    } catch (err) {
        res.status(500).json({ message: "Reward failed", error: err.message });
    }
};
