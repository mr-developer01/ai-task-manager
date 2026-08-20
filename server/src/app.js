import express from "express";

import taskRouter from "./routes/task.routes.js";
import { requestLogger } from "./middleware/requestLogger.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());
app.use(requestLogger);

app.get("/", (req, res) => {
  res.send("AI Task Manager backend is running.");
});

app.use("/api/tasks", taskRouter);

app.use(errorHandler);

export default app;
