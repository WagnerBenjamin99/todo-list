import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { MouseEventHandler } from 'react';
export function CloseButtonComponent(props:{onClose: MouseEventHandler<HTMLButtonElement> | undefined}){


    return <button type='reset' className="close-btn" onClick={props.onClose}> 
        <CloseRoundedIcon></CloseRoundedIcon>
     </button>
}