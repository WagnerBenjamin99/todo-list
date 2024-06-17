import { Task } from "./models/task";
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { EditRounded } from "@mui/icons-material";
import { DeleteRounded } from "@mui/icons-material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

export function TaskComponent(props: { task : Task, taskId:string, onDelete:(id:string)=>void, onPlay:(id:string)=>void, onFinish:(id:string)=>void}){ 
   
    

    const {task, taskId, onDelete, onPlay, onFinish} = props;
  
    console.log('ESTA TASK' , task)
    console.log('TITULO', task)
    
    function dateFormater(date:Date) {
      
    const day = date.getDate() + 1;
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
   
    return `${day}/${month}/${year}`;
    }


    const dateColor = 'text.secondary'

    const deleteTask = () =>{
      onDelete(taskId)  
    }

    const playTask = () => {
      
      onPlay(taskId)
    }

    const finishTask = () =>{
      onFinish(taskId)
    }

    const card = (
      <React.Fragment>

        <CardContent sx={{display:'flex', justifyContent:'center'}}>
          
          
          <Box sx={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between' }}>
            <div>
              <Typography variant="h5" component="div">
                {task.title}
              </Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }} color={dateColor}>
                <ScheduleIcon sx={{ mr: 0.5 }} />
                {`Fecha limite: ${dateFormater(new Date(task.dateLimit))}`}
              </Typography>
              <Typography variant="body2">
                {task.description}
              </Typography>
            </div>
            
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <div className="actions">
            {task.status === 'pending' ? 
              <button className="btn-functions" onClick={playTask}>
                <PlayArrowIcon sx={{ mr: 0.5, backgroundColor: "#77dd77", borderRadius: 5, padding: 1, color: "black", height: 20, width: 20, marginRight: 3}} />
              </button>
              :
              task.status === 'inProgress'? 
              <button className="btn-functions" onClick={finishTask}>

              <CheckCircleOutlineRoundedIcon sx={{ mr: 0.5, backgroundColor: "#77dd77", borderRadius: 5, padding: 1, color: "black", height: 20, width: 20, marginRight: 3}}></CheckCircleOutlineRoundedIcon>
             </button>
             :<></>

            }
            <button className="btn-functions">
              <EditRounded sx={{ mr: 0.5, backgroundColor: "#eced87", borderRadius: 5, padding: 1, color: "black", height: 20, width: 20 }} />
            </button>
            <button className="btn-functions" onClick={deleteTask}>
              <DeleteRounded sx={{ mr: 0.5, backgroundColor: "#c94139", borderRadius: 5, padding: 1, color: "black", height: 20, width: 20 }} />
            </button>
          </div>
        </CardActions>
         
       
      </React.Fragment>
    );

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" sx={{ borderRadius: '20px' }} className="task-card" >{card}</Card>
    </Box>
  );
}


