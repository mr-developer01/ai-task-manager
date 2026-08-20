## Problems begin to appear for server.js:

import express from "express";

const app = express();

app.use(express.json());

let tasks = [
  // Temporary tasks
];

app.get("/api/tasks", (req, res) => {
  // Get all task logic
});

app.get("/api/tasks/:id", (req, res) => {
  // Get one task logic
});

app.post("/api/tasks", (req, res) => {
  // Validation
  // Create task logic
});

app.patch("/api/tasks/:id", (req, res) => {
  // Find task
  // Validate task
  // Update task
});

app.delete("/api/tasks/:id", (req, res) => {
  // Find task
  // Delete task
});

app.listen(5000);

### Adding users:
    app.post("/api/users/register", ...);

    app.post("/api/users/login", ...);

    app.get("/api/users/profile", ...);

    app.patch("/api/users/profile", ...);

### Then subtasks:
    app.get("/api/subtasks", ...);

    app.post("/api/subtasks", ...);

    app.patch("/api/subtasks/:id", ...);

    app.delete("/api/subtasks/:id", ...);

### Then AI:
    app.post("/api/ai/generate-task", ...);

    app.post("/api/ai/generate-subtasks", ...);

    app.post("/api/ai/create-daily-plan", ...);

    app.post("/api/ai/improve-description", ...);

### Problems begin to appear:

   -- Difficult to find code
   -- Difficult to debug
   -- Difficult to test
   -- Difficult for multiple developers to work on
   -- Difficult to reuse logic
   -- One change may affect unrelated features

We solve this by separating responsibilities.

# Separation of concerns
--- Each file or layer should have a clear responsibility.

------Instead of one file doing everything------
    server.js
    │
    ├── Create Express application
    ├── Define routes
    ├── Validate data
    ├── Apply business rules
    ├── Access data
    ├── Handle errors
    └── Start server

## we separate the responsibilities:
    Route
    ↓
    Controller
    ↓
    Service
    ↓
    Data source

    | Layer      | Main question                                                      |
    | ---------- | ------------------------------------------------------------------ |
    | Route      | Which URL and HTTP method were requested?                          |
    | Controller | What should be read from the request and returned in the response? |
    | Service    | What business operation should happen?                             |
    | Data layer | Where is the data stored?                                          |
    | Middleware | What should happen before or after the route handler?              |

### Our new backend structure

    server/
    │
    ├── src/
    │   ├── controllers/
    │   │   └── task.controller.js
    │   │
    │   ├── routes/
    │   │   └── task.routes.js
    │   │
    │   ├── services/
    │   │   └── task.service.js
    │   │
    │   ├── middleware/
    │   │   └── requestLogger.middleware.js
    │   │
    │   ├── data/
    │   │   └── task.data.js
    │   │
    │   └── app.js
    │
    ├── server.js
    ├── package.json
    └── package-lock.json


##### Responsibility of each file #####

--- server.js ---
    Responsible only for starting the server.
    1. Start Express
    2. Listen on port 5000

    Note:-- It should not contain task routes or task business logic.

--- src/app.js ---
    Responsible for configuring the Express application.
    It will:
    1. Create the Express application
    2. Register middleware
    3. Register routes
    4. Export the application

    app.js
    Create Express app
        ↓
    Add middleware
        ↓
    Add routes
        ↓
    Export app

--- src/routes/task.routes.js ---
    Responsible for defining task API paths.
    GET     /api/tasks
    GET     /api/tasks/:id
    POST    /api/tasks
    PATCH   /api/tasks/:id
    DELETE  /api/tasks/:id

    Note :-- Routes should not contain large business logic.

--- src/controllers/task.controller.js ---
    Responsible for:
    1. Reading req.params
    2. Reading req.query
    3. Reading req.body
    4. Calling services
    5. Choosing HTTP status codes
    6. Sending responses

    ex :--
    export const getAllTasks = (req, res) => {
        const tasks = taskService.getAllTasks();

        res.status(200).json({
            success: true,
            data: tasks,
        });
    };

--- src/services/task.service.js ---
    Responsible for business logic.
    Examples:
    1. Find tasks
    2. Filter tasks
    3. Create tasks
    4. Update tasks
    5. Delete tasks
    6. Apply task-related rules

    Note:-- The service should not directly use: req or res
    Note:-- The service should receive normal JavaScript values and return normal JavaScript values.

--- src/data/task.data.js ---
    DB related

--- src/middleware/ ---
    Contains reusable functions that run during the request-response flow.
    Examples:
    1. Request logging
    2. Authentication
    3. Authorization
    4. Validation
    5. Error handling

### The behavior did not change. Only the code organization changed. ###

This is called refactoring.

Refactoring means improving the internal code structure without changing the application’s external behavior.

## Module 5: Backend Validation and Error Handling

    -- Centralized error handling
    -- 404 route handling
    -- Custom error classes
    -- Reusable validation
    -- Valid task statuses
    -- Valid task priorities
    -- Invalid ID handling
    -- Async error handling

    ## When something goes wrong ##
    Request
        ↓
    Validation
        ↓
    Error
        ↓
    Central error handler
        ↓
    Consistent JSON response

    ## What we'll learn ?? ##
    1. Why backend validation is necessary
    2. Validation vs error handling
    3. Validate request bodies
    4. Validate route parameters
    5. Validate allowed values
    6. Create reusable validation middleware
    7. Create custom application errors
    8. Create centralized error handling
    9. Handle unknown routes
    10. Understand 400, 404, 409, 500
    11. Handle unexpected errors
    12. Prepare our backend for asynchronous database operations

    # Validation vs Error Handling
    -- Validation ( Is the data provided by the client acceptable?? )
    -- Error Handling ( What should the application do when an error occurs?? )

    3. Our Task rules

    Let's define some rules for our Task Manager.
    A task must have:
    1. title
    --Required
    --Must be a string
    --Cannot contain only spaces
    --Maximum 100 characters

    2.description
    --Optional
    --Must be a string
    --Maximum 500 characters

    3.priority
    Must be one of:
    --LOW
    --MEDIUM
    --HIGH

    4.status
    Must be one of:
    --PENDING
    --IN_PROGRESS
    --COMPLETED

## Validate the Create Task request ##
    --src/controllers/task.controller.js
    export const createTask = (req, res) => {
        const {
            title,
            description,
            priority,
        } = req.body;

        if (!title || typeof title !== "string") {
            return res.status(400).json({
            success: false,
            message: "Task title is required.",
            });
        }

        if (!title.trim()) {
            return res.status(400).json({
            success: false,
            message: "Task title cannot be empty.",
            });
        }

        if (title.trim().length > 100) {
            return res.status(400).json({
            success: false,
            message:
                "Task title cannot exceed 100 characters.",
            });
        }

        if (
            description !== undefined &&
            typeof description !== "string"
        ) {
            return res.status(400).json({
            success: false,
            message:
                "Task description must be a string.",
            });
        }

        if (
            description &&
            description.length > 500
        ) {
            return res.status(400).json({
            success: false,
            message:
                "Task description cannot exceed 500 characters.",
            });
        }

        if (
            priority !== undefined &&
            !TASK_PRIORITIES.includes(priority)
        ) {
            return res.status(400).json({
            success: false,
            message:
                "Invalid task priority.",
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
    -- Too much validation inside the controller
    createTask()
    │
    ├── title validation
    ├── description validation
    ├── priority validation
    ├── create task
    └── response

    --Imagine we eventually have:--
    User validation
    Task validation
    Subtask validation
    Login validation
    AI request validation
    Supplier validation

    Our controllers will become huge.
    We need reusable validation middleware.

    -- What is validation middleware?
    Instead of:

    Request
        ↓
    Controller
    ├── validate
    ├── validate
    ├── validate
    └── business logic

    we want:
    Request
        ↓
    Validation middleware
        ↓
    Controller
        ↓
    Service
    The validation middleware handles the validation.

    --src/middleware/task.validation.middleware.js
        import { TASK_PRIORITIES } from "../constants/task.constants.js";

    export const validateCreateTask = (req,res,next) => {
        const {title,description,priority,} = req.body;

        if (!title || typeof title !== "string") {
            return res.status(400).json({
            success: false,
            message: "Task title is required.",
            });
        }

        if (!title.trim()) {
            return res.status(400).json({
            success: false,
            message:
                "Task title cannot be empty.",
            });
        }

        if (title.trim().length > 100) {
            return res.status(400).json({
            success: false,
            message:
                "Task title cannot exceed 100 characters.",
            });
        }

        if (
            description !== undefined &&
            typeof description !== "string"
        ) {
            return res.status(400).json({
            success: false,
            message:
                "Task description must be a string.",
            });
        }

        if (
            typeof description === "string" &&
            description.length > 500
        ) {
            return res.status(400).json({
            success: false,
            message:
                "Task description cannot exceed 500 characters.",
            });
        }

        if (
            priority !== undefined &&
            !TASK_PRIORITIES.includes(priority)
        ) {
            return res.status(400).json({
            success: false,
            message:
                "Invalid task priority.",
            });
        }

        next();
    };

## Custom Errors ##
    -- src/utils/AppError.js
    export class AppError extends Error {
        constructor(
            message,
            statusCode = 500
        ) {
            super(message);

            this.statusCode = statusCode;
            this.isOperational = true;
        }
    }

    Note:-- JavaScript has a built-in Error class.
    throw new Error( "Something went wrong" );