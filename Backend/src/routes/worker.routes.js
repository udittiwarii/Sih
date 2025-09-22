
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const workerCtrl = require("../controllers/worker.controller");

router.get("/tasks", auth, role("worker"), workerCtrl.getAssignedTasks);
router.put("/task/:id/accept", auth, role("worker"), workerCtrl.acceptTask);
router.put("/task/:id/deny", auth, role("worker"), workerCtrl.denyTask);
router.put("/task/:id/complete", auth, role("worker"), workerCtrl.completeTask);

module.exports = router;
