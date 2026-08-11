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