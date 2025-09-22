const jwt = require("jsonwebtoken");
const User = require("../Models/user.model");

const authMiddleware = async (req, res, next) => {
    try {
        // 1️⃣ Get token from cookies
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ message: "No token found in cookies" });
        }

        // 2️⃣ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3️⃣ Find user in DB
        const user = await User.findById(decoded.id).select("-password");
        if (!user) return res.status(401).json({ message: "User not found" });

        if (user.blocked) return res.status(403).json({ message: "User is blocked" });

        // 4️⃣ Attach user to request
        req.user = user;
        next();
    } catch (err) {
        console.error("Auth error:", err.message);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;
