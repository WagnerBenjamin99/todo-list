import './App.css'
import { TaskList } from './components/TaskList.tsx'

import { useEffect, useState } from 'react';
import { Task } from './models/task.ts';


import {TaskFormComponent} from './components/TaskFormComponent.tsx'
import { STATUS } from './models/STATUS.ts';

function App() {

 
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
}, []);


const onSaveTask = (newTask: { id: string; titulo: string; descripcion: string; date: string | number | Date; }) => {
    const task : Task = {
      id:newTask.id,
      title:newTask.titulo,
      description: newTask.descripcion,
      dateLimit: new Date(newTask.date),
      isFinished:false,
      status:STATUS.PENDING
    }
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    console.log("ACTUALIZADAS ", updatedTasks)
};


  return (
    
      
        <section className='app'>
      <div className="form-container">
        <TaskFormComponent onSaveTask={onSaveTask}></TaskFormComponent>
      </div>
      <div className="tasks-container">
        <TaskList status='pending' tasks={tasks} setTasks={setTasks} ></TaskList>
        <TaskList status='inProgress' tasks={tasks} setTasks={setTasks} ></TaskList>
        <TaskList status='finished' tasks={tasks} setTasks={setTasks} ></TaskList>
      
      </div>
     
    </section>

    
  )
}


export default App
