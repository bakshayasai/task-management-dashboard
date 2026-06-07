const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
let tasks = [
  { id: 1, task: "Learn React" },
  { id: 2, task: "Build MERN App" }
];
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
app.get("/tasks", (req, res) => {
  res.json(tasks);
  });
  app.post("/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    task: req.body.task
  };

  tasks.push(newTask);

  res.json(newTask);
});
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  tasks = tasks.filter(task => task.id !== id);

  res.json({ message: "Task deleted successfully" });
});
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  task.task = req.body.task;

  res.json(task);
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});