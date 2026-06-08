import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
const API_URL = "https://task-management-dashboard-z4ud.onrender.com/tasks"; 
// 🔴 IMPORTANT: replace with your actual Render backend URL

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  // 📥 GET TASKS
  const fetchTasks = async () => {
  try {
    const res = await axios.get(API_URL);
    console.log("API DATA:", res.data); // IMPORTANT DEBUG
    setTasks(res.data);
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    console.log("USEEFFECT RUNNING");
    fetchTasks();
  }, []);

  // ➕ ADD TASK
  const addTask = async () => {
    if (!task.trim()) return;

    try {
      await axios.post(API_URL, { task: task });
      setTask("");
      fetchTasks();
    } catch (err) {
      console.log("Error adding task:", err);
    }
  };

  // ❌ DELETE TASK
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (err) {
      console.log("Error deleting task:", err);
    }
  };

  // ✅ TOGGLE COMPLETE (optional backend support)
  const toggleComplete = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}`);
      fetchTasks();
    } catch (err) {
      console.log("Error updating task:", err);
    }
  };
 console.log("TASKS FROM API:",tasks);
  return (
    <div className="container">
      <h1>Task Management Dashboard</h1>

      {/* INPUT */}
      <div>
        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* TASK LIST */}
      <div>
        {tasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          tasks.map((task) => (
  <div key={task._id}>
    <span>
  {task.task}
</span>

    <button onClick={() => toggleleComplete(task._id)}>
      Complete
    </button>

    <button onClick={() => deleteTask(task._id)}>
      Delete
    </button>
  </div>
))
        )}
      </div>
    </div>
  );
}

export default App;