import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import {  ITaskService} from '../interfaces/services/task.service.interface';
import {socketConfig} from "../server"
@injectable()
export class TaskController {
  constructor(
    @inject('ITaskService') private taskService: ITaskService
  ) {}

  createTask = async (req: Request, res: Response) => {
    
      const task = await this.taskService.createTask(req.body);
      
      res.status(201).json({ success: true, message: "Task created", task });
   
  };

  getTasksByUser = async (req: Request, res: Response) => {
 
    const cursor = req.query.cursor as string | undefined;
      const prority = req.query.priority as string | undefined;
      const status = req.query.status as string | undefined;
      const { tasks ,nextCursor,hasMore,counts} = await this.taskService.getTasksByUser(req.params.userId as string, prority, status,cursor);
      res.json({ success: true, tasks, nextCursor, hasMore,counts });
    
  };

  getTaskById = async (req: Request, res: Response) => {
    
      const task = await this.taskService.getTaskById(req.params.taskId as string);
      if (!task) {
        return res.status(404).json({ success: false, message: "Task not found" });
      }
      res.json({ success: true, task });
    
  };

  updateTask = async (req: Request, res: Response) => {
    
      const task = await this.taskService.updateTask(req.params.taskId as string, req.body);
      if (!task) {
        return res.status(404).json({ success: false, message: "Task not found" });
      }
      res.json({ success: true, message: "Task updated", task });
    
  };

  deleteTask = async (req: Request, res: Response) => {
    
      const result = await this.taskService.deleteTask(req.params.taskId as string);
      if (!result) {
        return res.status(404).json({ success: false, message: "Task not found" });
      }
      res.json({ success: true, message: "Task deleted" });
    
  };
}