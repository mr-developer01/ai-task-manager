export let tasks = [
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

export const getNextTaskId = () => {
  const currentTaskId = nextTaskId;

  nextTaskId++;

  return currentTaskId;
};
