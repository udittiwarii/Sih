// routes/auth.routes.js
const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth.controller");

// Citizen/Worker/Admin register or admin should be created manually
router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);

// Admin login with keyword
router.post("/admin-login", authCtrl.adminLoginWithKeyword);

// Worker login by workerKey (optional)
router.post("/worker-login", authCtrl.workerLoginByKey);

module.exports = router;
