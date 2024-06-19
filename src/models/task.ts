import { STATUS } from "./STATUS"

export interface Task {
    id:string,
    title : string,
    description : string,
    dateLimit : Date,
    status: STATUS,
    isFinished : boolean,
    isEditing : boolean

}