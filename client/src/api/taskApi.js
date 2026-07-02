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
    console.log('Task created successfully:', response.data);
  })
  .catch((error) => {
    if (error.response && error.response.data && error.response.data.message) {
      const validationErrors = JSON.parse(error.response.data.message);
      console.log('Validation errors:', validationErrors);
      throw new Error(JSON.stringify(validationErrors));
    } else {
      console.error('Error creating task:', error);
      toast.error('Error creating task.');
    }
  });
}
export const fetchUserData = async (userId,priority,status)=>{
try {
  console.log(priority,status,"priority,status")
  
 const url =
  ROUTES.FETCH_TASK_BY_USER.replace(":userId", userId) +
  `?priority=${priority === "All" ? "" : priority}&status=${status === "All" ? "" : status}`;

const response = await api.get(url);

    return response.data.tasks
  console.log(response,"responseSDTAA")
} catch (error) {
  console.log(error)
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
      console.log('Task updated successfully:', response.data);
    })
    .catch(error => {
      toast.error('Error updating task.');
      console.error('Error updating task:', error);
    });
  }
  export const deleteTaskApi= async(taskId) =>{
    await api.delete(ROUTES.DELETE_TASK.replace(":taskId",taskId))
    .then(response => {
      toast.success('Task deleted successfully!');
      console.log('Task deleted successfully:', response.data);
    })
    .catch(error => {
      toast.error('Error deleting task.');
      console.error('Error deleting task:', error);
    });
  }