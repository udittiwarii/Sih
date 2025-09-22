// routes/admin.routes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const adminCtrl = require("../controllers/admin.controller");

// only for admins
router.get("/complaints", auth, role("admin"), adminCtrl.getAllComplaints);
router.put("/complaint/:id/validate", auth, role("admin"), adminCtrl.validateComplaint);
router.put("/complaint/:id/assign", auth, role("admin"), adminCtrl.assignToWorker);
router.delete("/complaint/:id", auth, role("admin"), async (req, res) => {
  const { id } = req.params;
  try {
    await require("../Models/complaint.model").findByIdAndDelete(id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
});

router.get("/users", auth, role("admin"), async (req, res) => {
  const User = require("../Models/user.model");
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users);
});

router.put("/user/:id/block", auth, role("admin"), adminCtrl.blockUser);
router.put("/user/:id/reward", auth, role("admin"), adminCtrl.rewardUser);

module.exports = router;
