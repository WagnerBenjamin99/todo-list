import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
export function CloseButtonComponent(props:{onClose}){


    return <button type='reset' className="close-btn" onClick={props.onClose}> 
        <CloseRoundedIcon></CloseRoundedIcon>
     </button>
}