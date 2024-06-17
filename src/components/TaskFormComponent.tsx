import { useState } from 'react';
import { Button, TextField } from "@mui/material";
import { STATUS } from '../models/STATUS';
import { v4 as uuid } from 'uuid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CloseButtonComponent } from './CloseButtonComponent';

export function TaskFormComponent(props : {onSaveTask: (arg0: { id: string; titulo: string; descripcion: string; date: string; status: STATUS; }) => void}) {
    const [formValues, setFormValues] = useState({
        id:uuid(),
        titulo: '',
        descripcion: '',
        date: '',
        status:STATUS.PENDING
    });

    const [iconClassName, setIconClassName] = useState('open-form-btn');
    const [formClassName, setFormClassName] = useState('notVisible');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

   
    const handleDateChange = (event: { target: { name: string; value: string; }; }) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        props.onSaveTask(formValues)
        setFormValues({
          id:uuid(),
          titulo: '',
          descripcion: '',
          date: '',
          status:STATUS.PENDING
        })

     };
   
        const handleClick = () => {
          
          if (iconClassName === 'open-form-btn') {
               setIconClassName('notVisible');
               setFormClassName('form-bg');
             } else {
               setIconClassName('open-form-btn');
          }
               
        }

        const handleOnClose =  () =>{
            setIconClassName('open-form-btn')
            setFormClassName('notVisible')
        }

    return (
     <>
          <button className={iconClassName} onClick={handleClick}>
               <AddCircleOutlineIcon sx={{width:"50px", height:"50px"}}></AddCircleOutlineIcon>
          </button>
        
        <div className={formClassName}>
           
            

            <form onSubmit={handleSubmit} className='task-form'>
                <div className="close btn">
                    <CloseButtonComponent onClose={handleOnClose} ></CloseButtonComponent>
                </div>
                <TextField
                    id="titulo"
                    name="titulo"
                    label="Titulo"
                    variant="standard"
                    fullWidth
                    value={formValues.titulo}
                    onChange={handleInputChange}
                />
                <TextField
                    id="descripcion"
                    name="descripcion"
                    label="Descripcion"
                    variant="standard"
                    fullWidth
                    value={formValues.descripcion}
                    onChange={handleInputChange}
                />
                <TextField
                    type="date"
                    id="fecha"
                    name="date"
                    label="Fecha limite"
                    variant="standard"
                    fullWidth
                    value={formValues.date}
                    onChange={handleDateChange}
                />
                <Button type="submit" variant="contained" color="success">
                    Agregar
                </Button>
            </form>
        </div>
        </>
    );
}
