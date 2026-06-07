
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Task = require("./models/Task");
const app = express();

app.use(cors());
app.use(express.json());
console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected 🎉"))
  .catch((err) => console.log(err));
let tasks = [
  { id: 1, task: "Learn React" },
  { id: 2, task: "Build MERN App" }
];
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const newTask = await Task.create({
      task: req.body.task
    });

    res.json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});  
app.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.put("/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { task: req.body.task },
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});