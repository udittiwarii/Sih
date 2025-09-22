// routes/complaint.routes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const complaintCtrl = require("../controllers/complaint.controller");

// multer setup for single image upload (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", auth, role("citizen"), upload.single("image"), complaintCtrl.createComplaint);
router.get("/my", auth, role("citizen"), complaintCtrl.getCitizenComplaints);

module.exports = router;
