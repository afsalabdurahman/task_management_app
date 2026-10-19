import { toast } from "react-toastify";
import api from "../services/axios";
import { ROUTES } from "../services/contants";

export const taskFormApi= async(formData,userId) =>{
await
api.post(ROUTES.TASK_FORM, {
    title: formData.title,
    description: formData.description,
    dueDate: formData.dueDate,
    priority: formData.priority,
    status: formData.status,
    userId: userId
  })
  .then(response => {
    toast.success('Task created successfully!');
  })
  .catch((error) => {
    console.log(error.respons,"Api ERROR")
      if (error.response?.data?.code =="DUPLICATE_KEY_ERROR"){
        throw new Error(JSON.stringify({ apiError: "Duplicate task not allowed" }));
      }
    if (error.response && error.response.data && error.response.data.message) {
        
      const validationErrors = JSON.parse(error.response.data.message);
     
      throw new Error(JSON.stringify(validationErrors));
    } else {
     
      toast.error('Error creating task.');
    }
  });
}
export const fetchUserData = async (userId,priority,status,cursor)=>{
try {
  
  
 const url = cursor?
  ROUTES.FETCH_TASK_BY_USER.replace(":userId", userId) +
  `?priority=${priority === "All" ? "" : priority}&status=${status === "All" ? "" : status}&limit=5&cursor=${cursor}`: ROUTES.FETCH_TASK_BY_USER.replace(":userId", userId) +
  `?priority=${priority === "All" ? "" : priority}&status=${status === "All" ? "" : status}`;

const response = await api.get(url);

    return response.data

} catch (error) {
  throw new Error("Error fetching user data: " + error.message);
}
} 
export const updateTaskApi= async(formData,taskId) =>{
  await
  api.put(ROUTES.UPDATE_TASK.replace(":taskId",taskId), {
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      priority: formData.priority,
      status: formData.status,
    })
    .then(response => {
      toast.success('Task updated successfully!');
      
    })
    .catch(error => {
      toast.error('Error updating task.');
    
    });
  }
  export const deleteTaskApi= async(taskId) =>{
    await api.delete(ROUTES.DELETE_TASK.replace(":taskId",taskId))
    .then(response => {
      toast.success('Task deleted successfully!');
      
    })
    .catch(error => {
      toast.error('Error deleting task.');
   
    });
  }