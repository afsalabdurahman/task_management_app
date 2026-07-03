import { TaskData } from "../../dtos/task.response.dto";
import { ITask } from "../../models/task.model";

export interface ITaskService {
  createTask(data: TaskData): Promise<ITask>;
  getTasksByUser(userId: string, priority?: string, status?: string): Promise<ITask[]>;
  getTaskById(taskId: string): Promise<ITask | null>;
  updateTask(taskId: string, data: Partial<{ title: string; description: string; dueDate: Date; priority: 'high' | 'medium' | 'low'; status: 'todo' | 'in-progress' | 'completed'; }>): Promise<ITask | null>;
  deleteTask(taskId: string): Promise<boolean>;
}