import { tasks, getNextTaskId } from "../data/task.data.js";
import { AppError } from "../utlis/AppError.js";

export const getAllTasks = (status) => {
  if (status) {
    return tasks.filter((task) => task.status === status);
  }

  return tasks;
};

export const getTaskById = (taskId) => {
  return tasks.find((task) => task.id === taskId);
};

export const createTask = ({ title, description, priority }) => {
  const newTask = {
    id: getNextTaskId(),
    title: title.trim(),
    description: description || "",
    status: "PENDING",
    priority: priority || "MEDIUM",
  };

  tasks.push(newTask);

  return newTask;
};

export const updateTask = (taskId, taskData) => {
  const task = getTaskById(taskId);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  const { title, description, status, priority } = taskData;

  if (title !== undefined) {
    task.title = title;
  }

  if (description !== undefined) {
    task.description = description;
  }

  if (status !== undefined) {
    task.status = status;
  }

  if (priority !== undefined) {
    task.priority = priority;
  }

  return task;
};

export const deleteTask = (taskId) => {
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return undefined;
  }

  const [deletedTask] = tasks.splice(taskIndex, 1);

  return deletedTask;
};
