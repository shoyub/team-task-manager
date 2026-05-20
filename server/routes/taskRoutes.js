import express from "express";

import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/roleMiddleware.js";

import {
  createTask,
  getTasks,
  updateTaskStatus,
  dashboardStats,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();



// Admin creates task
router.post("/", protect, adminOnly, createTask);



// Logged in users
router.get("/", protect, getTasks);



// Update task status
router.put("/:taskId/status", protect, updateTaskStatus);



// Dashboard
router.get("/dashboard/stats", protect, dashboardStats);

// Update Task
router.put("/:taskId", protect, adminOnly, updateTask);


// Delete Task
router.delete("/:taskId", protect, adminOnly, deleteTask);

export default router;