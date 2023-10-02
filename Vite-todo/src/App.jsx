import React, { useState, useEffect } from "react";
import "./App.css";


function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }}, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));}, [tasks]);

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
      setInput("");
 } };

 
  const deleteTask = (id) => {
  setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="App">
      <div>
    <input
       value={input}
    onChange={(e) => setInput(e.target.value)}
   placeholder="Add a task"/>
    <button onClick={addTask}>Add</button>
  </div>
   <ul>
 {tasks.map((task) => (
    <li key={task.id}>



     <span
  onClick={() => toggleCompletion(task.id)}
  style={task.completed ? { textDecoration: "line-through" } : {}}
            >
     {task.completed ? "✔️" : "❌"} {task.text}
     
      </span>



    <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  ))}</ul>
    </div>);}

export default App;
