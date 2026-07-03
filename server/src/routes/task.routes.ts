import { Router } from 'express';
import { container } from 'tsyringe';
import { TaskController } from '../controllers/task.controller';
import {  taskDependencies, } from '../config/container';
import { ITaskService } from '../interfaces/services/task.service.interface';
import { authenticate } from '../middlewares/auth.user.middleware';
taskDependencies()


const router = Router();

// Resolve from container and pass to constructor
const taskService = container.resolve<ITaskService>('ITaskService');
const controller = new TaskController(taskService);

router.post('/create', authenticate, controller.createTask);
router.get('/user/:userId', authenticate, controller.getTasksByUser);
router.get('/:taskId', authenticate, controller.getTaskById);
router.put('/:taskId', authenticate, controller.updateTask);
router.delete('/:taskId', authenticate, controller.deleteTask );

export default router;