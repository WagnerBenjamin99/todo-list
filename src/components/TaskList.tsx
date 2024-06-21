
import { Task } from "../models/task";
import { TaskComponent } from "./TaskComponent";
import {STATUS} from '../models/STATUS'
import { useDrop } from "react-dnd";
import { ItemTypes } from "../utils/ItemTypes";
import { useState } from "react";

export function TaskList( props: {status:string, tasks:Task[], setTasks:(tasks:Task[])=>void }){


    const { tasks, setTasks} = props
    const [isDragging, setIsDragging] = useState(false);

    const [, drop] = useDrop({
      accept: ItemTypes.TASK, 
      drop: (item : Task) => {
        if (props.status === 'inProgress') handlePlayTask(item.id);
        else if (props.status === 'pending') handleCreateTask(item.id)
        else handleFinishTask(item.id)
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    });

      const handleCreateTask = (id:string) => {
        const updatedTasks = tasks.map(task => {
          if (task.id === id) {
              return { ...task, status: STATUS.PENDING }; 
          }
          return task;
        });
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      }      

      const handleDeleteTasks = (id:string) => {
      
        const updatedTasks = tasks.filter(task => task.id !== id);
        if (updatedTasks) {
          setTasks(updatedTasks);
          localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        }
      }

      

      const handlePlayTask = (id:string) => {

        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, status: STATUS.INPROGRESS }; 
            }
            return task;
        });
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      }

      const handleFinishTask = (id : string) => {
        const updatedTasks = tasks.map(task => {
          if (task.id === id) {
              return { ...task, status: STATUS.FINISHED }; 
          }
          return task;
        });
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks)); 
      }

      const handleSaveTask = (id:string, updatedTask:Task) => {
        console.log('ACAAAA', id, updatedTask)
        const oldTask = tasks.find(task => task.id === id)
        const index = tasks.indexOf(oldTask!);
        tasks[index] = updatedTask;
        const updatedTasks = [...tasks];
        updatedTasks[index] = updatedTask;
  
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      } 

     const  handleDragging = (isDragging : boolean) => {
      setIsDragging(isDragging)
     }


      
    const filteredTasks = tasks.filter( task => 
        task.status == props.status) 
    let className = 'task-list';
    let title = '';
    if(props.status === "finished"){ 
        className += ' completed-tasks'
        title = 'Tareas completadas '
    }
    else if(props.status ==='inProgress') {
        className += ' inProgress-tasks'
        title = 'Tareas en progreso'
    }
    else {
        className += ' pending-tasks'
        title = 'Tareas pendientes'
    }
   
    


    return <div className={className} ref={drop} style={{overflow: isDragging ? 'hidden' : 'initial'} }>
        <h2 className="list-title" >{title} </h2>
        {filteredTasks.map ( e =>
    
            <TaskComponent key={e.id} taskId ={e.id} task={e} onDelete={handleDeleteTasks} onPlay={handlePlayTask} onFinish={handleFinishTask} onSave={handleSaveTask} onDragging={handleDragging}></TaskComponent>
        )}
       </div>
}