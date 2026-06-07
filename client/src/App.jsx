import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  useEffect(() => {
  axios.get("http://localhost:5000/tasks")
    .then((res) => {
      setTasks(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([
  { text: "Learn React", completed: false },
  { text: "Build MERN Project", completed: false },
  { text: "Submit ScholarX Internship", completed: false },
  ]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, task]);
    setTask("");
  };

  return (
    
    <div className="container">
      <h1>Task Management Dashboard</h1>
              <p>Manage your tasks efficiently</p>
      <input
        type="text"
        placeholder="Enter task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={addTask}>Add Task</button>
<hr />

<h2>Tasks List</h2>

<ul>
  {tasks.map((task) => (
    <li key={task._id}>{task.task}</li>
  ))}
</ul>
      <ul>
        {tasks.map((item, index) => (
          <li key={index}>
  <span
  style={{
    textDecoration: item.completed
      ? "line-through"
      : "none",
    color: item.completed
      ? "green"
      : "black",
  }}
>
  {item.text}
</span>
<button
  onClick={() => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed =
      !updatedTasks[index].completed;
    setTasks(updatedTasks);
  }}
>
  Complete
</button>
  <button
    onClick={() => {
      const updatedTasks = tasks.filter(
        (_, i) => i !== index
      );
      setTasks(updatedTasks);
    }}
  >
    Delete
  </button>
</li>
        ))}
      </ul>
    </div>
  );
}

export default App;