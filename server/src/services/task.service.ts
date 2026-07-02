import { injectable, inject } from 'tsyringe';
import {  ITaskService  } from '../interfaces/services/task.service.interface';
import { ITaskRepository } from '../interfaces/repositories/task.repository.interface';
import { ITask } from '../models/task.model';
import mongoose from 'mongoose';
import { getIO } from '../config/socket';
import { validateTask } from '../utils/validators';
import { ValidationError } from '../utils/errors';

@injectable()
export class TaskService implements ITaskService {
  constructor(
    @inject('ITaskRepository') private taskRepo: ITaskRepository
  ) {}

async createTask(data: any) {
  const result = validateTask(data);
  if (!result.isValid) {
    console.log(result.errors);
    throw new Error(JSON.stringify(result.errors));
  }
    const task = await this.taskRepo.create({...data, userId: new mongoose.Types.ObjectId(data.userId)});

    const io = getIO();

 io.emit("taskCreated", task);


    return task;
}

  async getTasksByUser(userId: string, priority?: string, status?: string): Promise<ITask[]> {
    console.log(userId, priority, status, "Service")
    const filter: any = { userId: new mongoose.Types.ObjectId(userId) };
    if (priority) filter.priority = priority.toLowerCase();
    if (status) filter.status = status.toLowerCase()=="in progress"?"in-progress":status.toLowerCase();
    console.log(filter, "Filter in service")
    return this.taskRepo.find(filter);
  }

  async getTaskById(taskId: string): Promise<ITask | null> {
    return this.taskRepo.findById(taskId);
  }

  async updateTask(taskId: string, data: Partial<{ title: string; description: string; dueDate: Date; priority: 'high' | 'medium' | 'low'; status: 'todo' | 'in-progress' | 'completed'; }>): Promise<ITask | null> {
       const io = getIO();

 
    const updatedTask= await this.taskRepo.update(taskId, data)
    console.log(updatedTask,"Updated Task")
    io.emit("taskUpdated", updatedTask);
    return updatedTask
  }

  async deleteTask(taskId: string): Promise<boolean> {
    const result = await this.taskRepo.delete(taskId);
    getIO().emit("taskDeleted",taskId)
    console.log(`Task deletion result for ID ${taskId}:`, result);
    return result;
  }
}   
