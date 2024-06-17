
import { Task } from "../models/task";
import { TaskComponent } from "../TaskComponent";
import {STATUS} from '../models/STATUS'

export function TaskList( props: {status:string, tasks:Task[], setTasks:(tasks:Task[])=>void }){


    const { tasks, setTasks} = props

       
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
                return { ...task, status: STATUS.INPROGRESS }; // Actualiza el status de la tarea
            }
            return task;
        });
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
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
    console.log(filteredTasks)
    


    return <div className={className}>
        <h2 className="list-title" >{title} </h2>
        {filteredTasks.map ( e =>
    
            <TaskComponent key={e.id} taskId ={e.id} task={e} onDelete={handleDeleteTasks} onPlay={handlePlayTask}></TaskComponent>
        )}
       </div>
}