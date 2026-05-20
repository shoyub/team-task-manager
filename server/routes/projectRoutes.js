import express from "express";

import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/roleMiddleware.js";

import {
  createProject,
  getProjects,
  addMember,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();


// Admin only
router.post("/", protect, adminOnly, createProject);


// Logged in users
router.get("/", protect, getProjects);


// Admin only
router.put("/:projectId/add-member", protect, adminOnly, addMember);
// Update Project
router.put("/:projectId", protect, adminOnly, updateProject);


// Delete Project
router.delete("/:projectId", protect, adminOnly, deleteProject);

export default router;