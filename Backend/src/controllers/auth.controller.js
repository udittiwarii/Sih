// controllers/auth.controller.js
const User = require("../Models/user.model");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
    try {
        const { name, email, password, role, workerKey } = req.body;
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "Email already registered" });

        const user = new User({ name, email, password, role, workerKey });
        await user.save();
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.status(201).json({
            message: "Created succesfully",
            role
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Registration failed", error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(401).json({ message: "Invalid Passward" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.json({
            message: "Login succesfully",
            token,
            user,
            role
        });
    } catch (err) {
        res.status(500).json({ message: "Login error", error: err.message });
    }
};

// Admin-login with secret keyword (separate endpoint)
exports.adminLoginWithKeyword = async (req, res) => {
    try {
        const { email, password, keyword } = req.body;
        if (keyword !== process.env.ADMIN_SECRET_KEY) return res.status(401).json({ message: "Invalid admin keyword" });

        const user = await User.findOne({ email, role: "admin" });
        if (!user) return res.status(401).json({ message: "Invalid admin credentials" });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(401).json({ message: "Invalid admin credentials" });
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.json({
            message: 'Admin Login successfully'
        });
    } catch (err) {
        res.status(500).json({ message: "Admin login failed", error: err.message });
    }
};

// Worker login by workerKey (no password required) - optional flow
exports.workerLoginByKey = async (req, res) => {
    try {
        const { workerKey } = req.body;
        const user = await User.findOne({ workerKey, role: "worker" });
        if (!user) return res.status(401).json({ message: "Invalid worker key" });
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.json({
            message:'Worker login '
        });
    } catch (err) {
        res.status(500).json({ message: "Worker login failed", error: err.message });
    }
};
