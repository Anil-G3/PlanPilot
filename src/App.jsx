import React, { useEffect, useState } from 'react';
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';
import ProgressTracker from './Components/ProgressTracker';
import './App.css';

export default function App() {
  // Load tasks from localStorage on startup, otherwise start with empty array
  const [tasks, settasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever the 'tasks' array changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    settasks(prevTasks => [...prevTasks, task]);
  };

  const updateTask = (updatedTask, index) => {
    const newtask = [...tasks];
    newtask[index] = updatedTask;
    settasks(newtask);
  };

  const deleteTask = (index) => {
    settasks(tasks.filter((_, i) => i !== index));
  };

  const clearTasks = () => {
    if (window.confirm("Are you sure you want to clear all tasks?")) {
      settasks([]);
    }
  };

  return (
    <div className='App'>
      <header>
        <h1 className='title'>PlanPilot</h1>
        <p className='tagline'>Ideas in. Actions out.</p>
      </header>
      
      <TaskForm addTask={addTask} />
      
      <TaskList 
        tasks={tasks} 
        updateTask={updateTask} 
        deleteTask={deleteTask} 
      />
      
      <ProgressTracker tasks={tasks} />

      {tasks.length > 0 && (
        <button onClick={clearTasks} className='clear-btn'>
          Clear all Tasks
        </button>
      )}

      <footer className='footer'>
        © 2026 Anil G &nbsp;·&nbsp; PlanPilot &nbsp;·&nbsp; All rights reserved
      </footer>
      
    </div>
  );
}
