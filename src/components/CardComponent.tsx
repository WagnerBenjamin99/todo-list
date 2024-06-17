import { useState } from "react";
import Stack from '@mui/material/Stack';
import { Divider } from "@mui/material";
import { Task } from "../models/task"

//export function CardComponent(props: { name: string; description: string; isFinished: boolean; dateLimit: string }){
    export function CardComponent(props: { task : Task}){ 
   const {task} = props;
    const [isFinished, setIsFinished] = useState(false);
    
    const text = isFinished?'Finalizada':'En curso';
    const styleClass : string = isFinished?'task-card finished':'task-card not-finished';
    const handleClick = () => {
        setIsFinished(!isFinished)
    }

    
    return ( 
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
        
    )
}