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
    try {
      const task = await this.taskService.createTask(req.body);
      
      res.status(201).json({ success: true, message: "Task created", task });
    } catch (error: any) {
      console.log(error,"Erry______")
      res.status(400).json({ success: false, message: error.message });
    }
  };

  getTasksByUser = async (req: Request, res: Response) => {
    try {
      console.log(req.params,"PARSNS")
      const prority = req.query.priority as string | undefined;
      const status = req.query.status as string | undefined;
      const tasks = await this.taskService.getTasksByUser(req.params.userId as string, prority, status);
      res.json({ success: true, tasks });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  getTaskById = async (req: Request, res: Response) => {
    try {
      const task = await this.taskService.getTaskById(req.params.taskId as string);
      if (!task) {
        return res.status(404).json({ success: false, message: "Task not found" });
      }
      res.json({ success: true, task });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  updateTask = async (req: Request, res: Response) => {
    try {
      console.log(req.body,"Bodyyy")
      const task = await this.taskService.updateTask(req.params.taskId as string, req.body);
      if (!task) {
        return res.status(404).json({ success: false, message: "Task not found" });
      }
      res.json({ success: true, message: "Task updated", task });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  deleteTask = async (req: Request, res: Response) => {
    try {
      const result = await this.taskService.deleteTask(req.params.taskId as string);
      if (!result) {
        return res.status(404).json({ success: false, message: "Task not found" });
      }
      res.json({ success: true, message: "Task deleted" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
}