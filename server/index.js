// const express = require('express');
import express from "express";

const app = express();

app.use(express.json());

const PORT = 5000;

let tasks = [
  {
    id: 1,
    title: "Learn Node.js",
    description: "Understand Node.js fundamentals",
    status: "PENDING",
    priority: "HIGH",
  },
  {
    id: 2,
    title: "Learn Express.js",
    description: "Build REST APIs using Express",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
  },
];

let nextTaskId = 3;

app.get("/", (req, res) => {
  res.send("AI Task Manager backend is running.");
});

app.get("/api/hello", (req, res) => {
  res.json({
    success: true,
    message: "Hello from the Node.js backend.",
  });
});

app.get("/api/tasks", (req, res) => {
  //2. Query parameters -- Purpose --> Filters or modifies results (Filtering, Searching, Sorting,Pagination)
  // GET /api/tasks?status=PENDING

  const { status } = req.query;

  let filteredTasks = tasks;

  if (status) {
    filteredTasks = tasks.filter((task) => task.status === status);
  }

  console.log(req.query);
  res.status(200).json({
    success: true,
    data: filteredTasks,
  });
});

app.get("/api/tasks/:id", (req, res) => {
  //1. Route parameters -- Purpose --> Identifies a specific resource
  console.log(req.params);

  const taskID = Number(req.params.id);

  const task = tasks.find((data) => data.id === taskID);

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
});

app.post("/api/tasks", (req, res) => {
  console.log(req.body);

  const { title, description, priority } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: "Task title is required.",
    });
  }

  const newTask = {
    id: tasks.length + 1,
    title: title.trim(),
    description: description.trim(),
    status: "PENDING",
    priority: priority.trim(),
  };

  nextTaskId++;

  tasks.push(newTask);

  res.status(201).json({
    success: true,
    message: "Task created successfully.",
    data: newTask,
  });
});

app.patch("/api/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);
  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found.",
    });
  }

  const { title, description, status, priority } = req.body;

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

  res.status(200).json({
    success: true,
    message: "Task updated successfully.",
    data: task,
  });
});

app.delete("/api/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);

  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Task not found.",
    });
  }

  const deletedTask = tasks[taskIndex];

  tasks.splice(taskIndex, 1);

  res.status(200).json({
    success: true,
    message: "Task deleted successfully.",
    data: deletedTask,
  });
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
