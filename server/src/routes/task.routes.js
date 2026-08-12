import express from "express";

import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";

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

router.post("/", createTask);

router.patch("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;
