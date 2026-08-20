import express from "express";
import { tasks } from "../data/task.data.js";

const router = express.Router();

router.get("/", (req, res) => {
  const { status } = req.query;

  let filterTask = tasks;
  if (status) {
    filterTask = tasks.filter((task) => task.status === status);
  }

  res.status(200).json({
    success: true,
    data: filterTask,
  });
});

export default router;
