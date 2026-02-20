import React from 'react'
import TaskForm from './Components/TaskForm'
import TaskList from './Components/TaskList'
import ProgressTracker from './Components/ProgressTracker'

export default function App() {
  return (
    <div>
      <h1>Task Buddy</h1>
      <p>Your friendly task manager</p>
      <TaskForm />
      <TaskList />
      <ProgressTracker />
      <button>Clear all tasks</button>
    </div>
  )
}
