import { TASK_PRIORITIES } from "../constants/task.constants.js";
import {
  getAllTasks as getAllTasksService,
  getTaskById as getTaskByIdService,
  createTask as createTaskService,
  updateTask as updateTaskService,
  deleteTask as deleteTaskService,
} from "../services/task.service.js";
import { AppError } from "../utlis/AppError.js";

export const getAllTasks = (req, res) => {
  const { status } = req.query;

  const tasks = getAllTasksService(status);

  res.status(200).json({
    success: true,
    data: tasks,
  });
};

export const getTaskById = (req, res) => {
  const taskId = Number(req.params.id);

  const task = getTaskByIdService(taskId);

  if (!task) {
    throw new AppError( "Task not found.", 404 );
  }

  res.status(200).json({
    success: true,
    data: task,
  });
};

export const createTask = (req, res) => {
  const { title, description, priority } = req.body;

  const newTask = createTaskService({
    title,
    description,
    priority,
  });

  res.status(201).json({
    success: true,
    message: "Task created successfully.",
    data: newTask,
  });
};

export const updateTask = (req, res) => {
  const taskId = Number(req.params.id);

  const updatedTask = updateTaskService(taskId, req.body);

  res.status(200).json({
    success: true,
    message: "Task updated successfully.",
    data: updatedTask,
  });
};

export const deleteTask = (req, res) => {
  const taskId = Number(req.params.id);

  const deletedTask = deleteTaskService(taskId);

  if (!deletedTask) {
    throw new AppError( "Task not found.", 404 );
  }

  res.status(200).json({
    success: true,
    message: "Task deleted successfully.",
    data: deletedTask,
  });
};
