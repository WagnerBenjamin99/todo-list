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
import { TextField, Button } from "@mui/material";
import { useState } from "react";

export function TaskComponent(props: { task: Task, taskId: string, onDelete: (id: string) => void, onPlay: (id: string) => void, onFinish: (id: string) => void, onSave: (id: string, updatedTask: Task) => void }) {

  const { task, taskId, onDelete, onPlay, onFinish, onSave } = props;
  const [editing, setEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    title: task.title,
    description: task.description,
    dateLimit: task.dateLimit
  });

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
};


  const dateColor = 'text.secondary'

  const deleteTask = () => {
    onDelete(taskId)
  }

  const playTask = () => {
    onPlay(taskId)
  }

  const finishTask = () => {
    onFinish(taskId)
  }

  const editTask = () => {
    setEditing(true);
  }

  const handleCancelEditing = () => {
    setEditing(false)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedTask = {
      ...task,
      title: formValues.title,
      description: formValues.description,
      dateLimit: new Date(formValues.dateLimit)
    };
    onSave(taskId, updatedTask);
    setEditing(false);
  }

  const card = (
    <React.Fragment>
      {editing ? (
        <form onSubmit={handleSave}>
          <CardContent>
            <TextField
              id="title"
              name="title"
              label="Titulo"
              variant="standard"
              fullWidth
              value={formValues.title}
              onChange={handleInputChange}
              required
            />
            <TextField
              id="description"
              name="description"
              label="Descripcion"
              variant="standard"
              fullWidth
              value={formValues.description}
              onChange={handleInputChange}
              required
            />
            <TextField
              type="datetime-local"
              id="dateLimit"
              name="dateLimit"
              label="Fecha limite"
              variant="standard"
              fullWidth
              value={formValues.dateLimit}
              onChange={handleInputChange}
              required
            />
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained" color="success" >Guardar</Button>
            <Button variant="outlined" color="warning" onClick={handleCancelEditing}>Cancelar</Button>
          </CardActions>
        </form>
      ) : (
        <>
          <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between' }}>
              <div>
                <Typography variant="h5" component="div">
                  {task.title}
                </Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }} color={dateColor}>
                  <ScheduleIcon sx={{ mr: 0.5 }} />
                 
                  {`Fecha limite: ${formatDate(new Date(task.dateLimit))}`}
              
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
                  <PlayArrowIcon sx={{ mr: 0.5, backgroundColor: "#77dd77", borderRadius: 5, padding: 1, color: "black", height: 20, width: 20, marginRight: 3 }} />
                </button>
                :
                task.status === 'inProgress' ?
                  <button className="btn-functions" onClick={finishTask}>
                    <CheckCircleOutlineRoundedIcon sx={{ mr: 0.5, backgroundColor: "#77dd77", borderRadius: 5, padding: 1, color: "black", height: 20, width: 20, marginRight: 3 }} />
                  </button>
                  : <></>
              }
              <button className="btn-functions" onClick={editTask}>
                <EditRounded sx={{ mr: 0.5, backgroundColor: "#eced87", borderRadius: 5, padding: 1, color: "black", height: 20, width: 20 }} />
              </button>
              <button className="btn-functions" onClick={deleteTask}>
                <DeleteRounded sx={{ mr: 0.5, backgroundColor: "#c94139", borderRadius: 5, padding: 1, color: "black", height: 20, width: 20 }} />
              </button>
            </div>
          </CardActions>
        </>
      )}
    </React.Fragment>
  );

  return (
    <Box sx={{ minWidth: 275 }}>
      {editing?
      <Card variant="outlined" sx={{ borderRadius: '20px', height:250 }} className="task-card" >{card}</Card>
      :
      <Card variant="outlined" sx={{ borderRadius: '20px' }} className="task-card" >{card}</Card>
      }
      
    </Box>
  );
}
