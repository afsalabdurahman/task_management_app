import { ITask } from "../../models/task.model";
import { TaskData } from "../task.response.dto";

export const toTaskResponse = (task: ITask): TaskData => {
  
    return{
        userId:task.userId,
        description:task.description,
        dueDate:task.dueDate,
        priority:task.priority,
        status:task.status,
        title:task.title,
        _id:task._id
    }

}