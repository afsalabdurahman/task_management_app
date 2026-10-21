import { injectable, inject } from 'tsyringe';
import {  ITaskService  } from '../interfaces/services/task.service.interface';
import { ITaskRepository } from '../interfaces/repositories/task.repository.interface';
import { ITask } from '../models/task.model';
import mongoose from 'mongoose';
import { getIO } from '../config/socket';
import { validateTask } from '../utils/validators';
import { ValidationError } from '../utils/errors';
import { TaskData } from '../dtos/task.response.dto';
import { toTaskResponse } from '../dtos/mappers/task.response.mapper';
import { MESSAGES } from '../constants/MESSAGES';

@injectable()
export class TaskService implements ITaskService {
   
  constructor(
    @inject('ITaskRepository') private taskRepo: ITaskRepository
  ) {}

async createTask(data:TaskData) {
  const result = validateTask(data);
  if (!result.isValid) {
    throw new ValidationError(JSON.stringify(result.errors));
  }
    // ensure dueDate is a Date when creating the task (validateTask may accept string)
    const dueDate = data.dueDate && typeof data.dueDate === 'string' ? new Date(data.dueDate) : (data.dueDate as unknown as Date | undefined);
    const task = await this.taskRepo.create({
      title: data.title,
      description: data.description,
      priority: data.priority,
      status: data.status,
      userId: new mongoose.Types.ObjectId(data.userId),
      dueDate,
    });
   
   
    const mappedTask = toTaskResponse(task)
   
    getIO().to(`user:${data.userId}`).emit("taskCreated", mappedTask);


    return mappedTask;
}

  async getTasksByUser(userId: string, priority?: string, status?: string, cursor?: string): Promise<{ tasks: TaskData[]; nextCursor: string | null; hasMore: boolean, counts: { total: number; completed: number; inprogress: number; high: number; }   }> {
    const filter: Partial<ITask> = { userId: new mongoose.Types.ObjectId(userId) };
    if (priority) filter.priority = priority.toLowerCase() as 'high' | 'medium' | 'low';
    if (status) filter.status = (status.toLowerCase() === 'in progress' ? 'in-progress' : status.toLowerCase()) as 'todo' | 'in-progress' | 'completed';
    const { tasks ,nextCursor,hasMore,counts} = await this.taskRepo.findWithPagination(filter, 3, cursor);
     const mappedTasks = tasks.map(task => toTaskResponse(task));
    return { tasks: mappedTasks, nextCursor, hasMore, counts };
  }

  async getTaskById(taskId: string): Promise<ITask | null> {
    return this.taskRepo.findById(taskId);
  }

  async updateTask(taskId: string, data: Partial<{ title: string; description: string; dueDate: Date; priority: 'high' | 'medium' | 'low'; status: 'todo' | 'in-progress' | 'completed'; }>): Promise<TaskData | null> {
   

 
    const updatedTask= await this.taskRepo.update(taskId, data)
    if(!updatedTask) throw new ValidationError(MESSAGES.TASK.NOT_FOUND)
       
      const mappedTask = toTaskResponse(updatedTask)
    
      getIO().to(`user:${updatedTask?.userId.toString()}`).emit("taskUpdated", mappedTask);
    return mappedTask;
  }

  async deleteTask(taskId: string): Promise<boolean> {
    const task = await this.taskRepo.findById(taskId);
    if (!task) {
      return false;
    }
    const result = await this.taskRepo.delete(taskId);
    getIO().to(`user:${task.userId.toString()}`).emit("taskDeleted", taskId);
    return result;
  }
}
    