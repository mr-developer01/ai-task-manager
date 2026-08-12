import {
  getAllTasks as getAllTasksService,
  getTaskById as getTaskByIdService,
  createTask as createTaskService,
  updateTask as updateTaskService,
  deleteTask as deleteTaskService,
} from "../services/task.service.js";

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
    return res.status(404).json({
      success: false,
      message: "Task not found.",
    });
  }

  res.status(200).json({
    success: true,
    data: task,
  });
};

export const createTask = (req, res) => {
  const { title, description, priority } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: "Task title is required.",
    });
  }

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

  if (!updatedTask) {
    return res.status(404).json({
      success: false,
      message: "Task not found.",
    });
  }

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
    return res.status(404).json({
      success: false,
      message: "Task not found.",
    });
  }

  res.status(200).json({
    success: true,
    message: "Task deleted successfully.",
    data: deletedTask,
  });
};
