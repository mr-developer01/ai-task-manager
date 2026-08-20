import express from "express";

import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import {
  validateCreateTask,
  validateUpdateTask,
  validateDeleteTask
} from "../middleware/task.validation.middleware.js";

const router = express.Router();
// A router is like a smaller Express application used to group related routes.

// Main Express application
// app
// │
// ├── Task router
// │
// ├── User router
// │
// ├── Authentication router
// │
// └── AI router

router.get("/", getAllTasks);

router.get("/:id", getTaskById);

router.post("/", validateCreateTask, createTask);

router.patch("/:id", validateUpdateTask, updateTask);

router.delete("/:id", validateDeleteTask, deleteTask);

export default router;
