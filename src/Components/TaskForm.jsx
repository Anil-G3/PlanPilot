import React, { useState } from 'react'

export default function TaskForm() {

    const[task, setTask] = useState('');
    const[priority, setPriority] = useState('Medium');
    const[category, setCategory] = useState('General');

  return (
    <form id='task-form'>
        <div id='inp'>
            <input type='text' placeholder='Enter your task' 
            onChange={(event) => {setTask(event.target.value)}} />
            <button type='submit'>Add Task</button>
             <h1>{task} {priority} {category}</h1>
        </div>

        <div className='btns'>
            <select onChange={(event) => {setPriority(event.target.value)}}>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
            </select>

            <select onChange={(event) => {setCategory(event.target.value)}}>
                <option>General</option>
                <option>Work</option>
                <option>Personal</option>
            </select>
        </div>
       
    </form>
  )
}
