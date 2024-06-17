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



export function TaskComponent(props: { task : Task, taskId:string, onDelete:(id:string)=>void, onPlay:(id:string)=>void}){ 
   
    

    const {task, taskId, onDelete, onPlay} = props;
  
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


    const card = (
    <React.Fragment>
        <CardContent>
        <Typography variant="h5" component="div">
            {task.title} 
        </Typography>
        <Typography sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }} color={dateColor} > {/* Añade display: 'flex' y alignItems: 'center' para alinear el icono con el texto */}
          <ScheduleIcon sx={{ mr: 0.5 }} /> {/* Icono de reloj con un margen a la derecha */}
          {`Fecha limite: ${dateFormater(new Date(task.dateLimit))}`}
        </Typography>
   
        <Typography variant="body2">
            {task.description}
        </Typography>
        </CardContent>
        <CardActions sx={{justifyContent:"flex-end"}}>
          <div className="actions">
            {task.status === 'pending' ? 
            <button className="btn-functions" onClick={playTask} > <PlayArrowIcon sx={{ mr: 0.5, backgroundColor : "#77dd77", borderRadius:5, padding:1, color:"black", height:20, width:20, marginRight:5 }}   ></PlayArrowIcon> </button>  
              :
              <></>
            }
         
            
              <button className="btn-functions" > <EditRounded sx={{ mr: 0.5, backgroundColor : "#eced87", borderRadius:5, padding:1, color:"black", height:20, width:20 }}  ></EditRounded> </button>
              <button className="btn-functions" onClick={deleteTask}>  <DeleteRounded sx={{ mr: 0.5, backgroundColor : "#c94139", borderRadius:5, padding:1, color:"black", height:20, width:20 }}  > </DeleteRounded> </button>
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




    /*return ( 
        <article className={styleClass}>
            <Stack 
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2} justifyContent={"space-around"} alignItems={"center"} width={"100vw"}>
                <strong> {task.title } </strong>              
                <p> {task.description} </p>
                <p> {text} </p>
                <p> {`${task.dateLimit.getDate() + 1}/${task.dateLimit.getMonth()+ 1}/${task.dateLimit.getFullYear()}`} </p>
                <input type="checkbox" className="check" onClick={handleClick} />
            </Stack>
            

        </article>
        
    )*/
