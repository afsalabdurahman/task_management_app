import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import {  ITaskService} from '../interfaces/services/task.service.interface';
import { HTTP_STATUS } from '../constants/HTTP_STATUS_CODE';
import { MESSAGES } from '../constants/MESSAGES';
@injectable()
export class TaskController {
  constructor(
    @inject('ITaskService') private taskService: ITaskService
  ) {}

  createTask = async (req: Request, res: Response) => {
    
      const task = await this.taskService.createTask(req.body);
      
      res.status(HTTP_STATUS.CREATED).json({ success: true, message: MESSAGES.TASK.CREATE, task });
   
  };

  getTasksByUser = async (req: Request, res: Response) => {
 
    const cursor = req.query.cursor as string | undefined;
      const prority = req.query.priority as string | undefined;
      const status = req.query.status as string | undefined;
      const { tasks ,nextCursor,hasMore,counts} = await this.taskService.getTasksByUser(req.params.userId as string, prority, status,cursor);
      res.status(HTTP_STATUS.OK).json({ success: true, tasks, nextCursor, hasMore,counts });
    
  };

  getTaskById = async (req: Request, res: Response) => {
    
      const task = await this.taskService.getTaskById(req.params.taskId as string);
      if (!task) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: MESSAGES.TASK.NOT_FOUND });
      }
      res.status(HTTP_STATUS.OK).json({ success: true, task });
    
  };

  updateTask = async (req: Request, res: Response) => {
    
      const task = await this.taskService.updateTask(req.params.taskId as string, req.body);
      if (!task) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: MESSAGES.TASK.NOT_FOUND });
      }
      res.json({ success: true, message: MESSAGES.TASK.UPDATE, task });
    
  };

  deleteTask = async (req: Request, res: Response) => {
    
      const result = await this.taskService.deleteTask(req.params.taskId as string);
      if (!result) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ success: false, message: MESSAGES.TASK.NOT_FOUND });
      }
      res.status(HTTP_STATUS.OK).json({ success: true, message: MESSAGES.TASK.DELETE });
    
  };
}