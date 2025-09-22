// controllers/worker.controller.js
const Complaint = require("../Models/complaint.model");

// Get tasks assigned to logged-in worker
exports.getAssignedTasks = async (req, res) => {
    try {
        const tasks = await Complaint.find({ assignedWorker: req.user._id }).populate("citizen").sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch tasks", error: err.message });
    }
};

// Worker accepts task
exports.acceptTask = async (req, res) => {
    try {
        const { id } = req.params;
        const complaint = await Complaint.findOne({ _id: id, assignedWorker: req.user._id });
        if (!complaint) return res.status(404).json({ message: "Task not found or not assigned to you" });

        complaint.status = "In Progress";
        await complaint.save();
        res.json({ message: "Task accepted", complaint });
    } catch (err) {
        res.status(500).json({ message: "Failed to accept", error: err.message });
    }
};

// Worker deny with reason
exports.denyTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;
        const complaint = await Complaint.findOne({ _id: id, assignedWorker: req.user._id });
        if (!complaint) return res.status(404).json({ message: "Task not found" });

        complaint.status = "Pending"; // or leave as Assigned
        complaint.denialReason = reason;
        await complaint.save();
        res.json({ message: "Task denied", complaint });
    } catch (err) {
        res.status(500).json({ message: "Failed to deny", error: err.message });
    }
};

// Worker complete task (upload evidence optional)
exports.completeTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { evidenceUrl } = req.body; // or multer process
        const complaint = await Complaint.findOne({ _id: id, assignedWorker: req.user._id });
        if (!complaint) return res.status(404).json({ message: "Task not found" });

        complaint.status = "Resolved";
        if (evidenceUrl) complaint.evidence = evidenceUrl;
        await complaint.save();

        res.json({ message: "Task completed", complaint });
    } catch (err) {
        res.status(500).json({ message: "Failed to complete", error: err.message });
    }
};
