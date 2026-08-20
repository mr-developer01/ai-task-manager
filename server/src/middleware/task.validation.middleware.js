import { TASK_PRIORITIES } from "../constants/task.constants.js";

export const validateCreateTask = (req, res, next) => {
  const { title, description, priority } = req.body;

  if (!title || typeof title !== "string") {
    throw new AppError("Task title is required.", 400);
  }

  if (!title.trim()) {
    throw new AppError("Task title cannot be empty.", 400);
  }

  if (title.trim().length > 100) {
    throw new AppError("Task title cannot exceed 100 characters.", 400);
  }

  if (description !== undefined && typeof description !== "string") {
    throw new AppError("Task description must be a string.", 400);
  }

  if (typeof description === "string" && description.length > 500) {
    throw new AppError("Task description cannot exceed 500 characters.", 400);
  }

  if (priority !== undefined && !TASK_PRIORITIES.includes(priority)) {
    throw new AppError("Invalid task priority.", 400);
  }

  next();
};

export const validateUpdateTask = (req, res, next) => {
  const { title, description, status, priority } = req.body;

  if (title !== undefined && (typeof title !== "string" || !title.trim())) {
    throw new AppError("Task title must be a non-empty string.", 400);
  }

  if (title !== undefined && title.trim().length > 100) {
    throw new AppError("Task title cannot exceed 100 characters.", 400);
  }

  if (description !== undefined && typeof description !== "string") {
    throw new AppError("Task description must be a string.", 400);
  }

  if (typeof description === "string" && description.length > 500) {
    throw new AppError("Task description cannot exceed 500 characters.", 400);
  }

  if (status !== undefined && !TASK_STATUSES.includes(status)) {
    throw new AppError("Invalid task status.", 400);
  }

  if (priority !== undefined && !TASK_PRIORITIES.includes(priority)) {
    throw new AppError("Invalid task priority.", 400);
  }

  next();
};

export const validateDeleteTask = (req, res, next) => {
  const taskId = Number(req.params.id);
  if (taskId) {
    throw new AppError("Task not found.", 400);
  }
  next();
};
