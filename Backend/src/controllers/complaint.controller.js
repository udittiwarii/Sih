// controllers/complaint.controller.js
const Complaint = require("../Models/complaint.model");
const { classifyByAI } = require("../service/aiClient.service");
const { uploadImage } = require("../service/imagekit.service"); // optional

// Submit complaint (citizen)
exports.createComplaint = async (req, res) => {
  try {
    const { description, location } = req.body;
    if (!location) return res.status(400).json({ message: "Location required" });

    // If multipart + multer used, image in req.file
    let imageUrl = null;
    let imageBase64 = null;
    if (req.file) {
      // Option A: upload to imagekit
      try {
        // req.file.buffer -> base64
        imageBase64 = req.file.buffer.toString("base64");
        if (uploadImage) {
          imageUrl = await uploadImage(req.file.buffer, `complaint_${Date.now()}.jpg`);
        } else {
          // fallback - you can store locally or create URL
          imageUrl = `data:${req.file.mimetype};base64,${imageBase64}`;
        }
      } catch (err) {
        console.warn("Image upload failed:", err.message);
      }
    }

    // Use AI classifier (imageBase64 and description)
    const aiResult = await classifyByAI({ imageBase64, descriptionText: description });

    const complaint = await Complaint.create({
      citizen: req.user._id,
      description,
      autoDescription: aiResult.autoDescription,
      location,
      imageUrl,
      category: aiResult.category,
      status: "Pending",
    });

    res.status(201).json({ message: "Complaint created", complaint });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create complaint", error: err.message });
  }
};

exports.getCitizenComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ citizen: req.user._id }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch complaints", error: err.message });
  }
};
