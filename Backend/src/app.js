const express = require("express");
const cors = require("cors");
const authRoutes = require('./routes/auth.routes')
const complaintRoutes = require('./routes/complaint.routes')
const adminRoutes = require('./routes/admin.routes')
const workerRoutes = require('./routes/worker.routes')
const cookieparser = require('cookie-parser')

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", // your frontend origin
    credentials: true               // allow cookies
}));
app.use(cookieparser())

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/worker", workerRoutes);

// Default route
app.get("/", (req, res) => {
    res.send("Clean & Green Ganga Solution Backend is Running!");
});


module.exports = app