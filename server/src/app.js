import express from "express";

import taskRouter from "./routes/task.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Task Manager backend is running.");
});

app.use("/api/tasks", taskRouter);

export default app;
