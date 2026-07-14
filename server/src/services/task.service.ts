import { injectable, inject } from 'tsyringe';
import {  ITaskService  } from '../interfaces/services/task.service.interface';
import { ITaskRepository } from '../interfaces/repositories/task.repository.interface';
import { ITask } from '../models/task.model';
import mongoose from 'mongoose';
import { getIO } from '../config/socket';
import { validateTask } from '../utils/validators';
import { ValidationError } from '../utils/errors';
import { TaskData } from '../dtos/task.response.dto';

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
    const task = await this.taskRepo.create({...data, userId: new mongoose.Types.ObjectId(data.userId), dueDate});

    const io = getIO();

 io.emit("taskCreated", task);


    return task;
}

  async getTasksByUser(userId: string, priority?: string, status?: string, cursor?: string): Promise<{ tasks: ITask[]; nextCursor: string | null; hasMore: boolean }> {
    const filter: Partial<ITask> = { userId: new mongoose.Types.ObjectId(userId) };
    if (priority) filter.priority = priority.toLowerCase() as 'high' | 'medium' | 'low';
    if (status) filter.status = (status.toLowerCase() === 'in progress' ? 'in-progress' : status.toLowerCase()) as 'todo' | 'in-progress' | 'completed';
    const { tasks ,nextCursor,hasMore} = await this.taskRepo.findWithPagination(filter, 3, cursor);
    console.log({ tasks, nextCursor, hasMore }, "result");
    return { tasks, nextCursor, hasMore };
  }

  async getTaskById(taskId: string): Promise<ITask | null> {
    return this.taskRepo.findById(taskId);
  }

  async updateTask(taskId: string, data: Partial<{ title: string; description: string; dueDate: Date; priority: 'high' | 'medium' | 'low'; status: 'todo' | 'in-progress' | 'completed'; }>): Promise<ITask | null> {
       const io = getIO();

 
    const updatedTask= await this.taskRepo.update(taskId, data)
    io.emit("taskUpdated", updatedTask);
    return updatedTask
  }

  async deleteTask(taskId: string): Promise<boolean> {
    const result = await this.taskRepo.delete(taskId);
    getIO().emit("taskDeleted",taskId)
    return result;
  }
}   
