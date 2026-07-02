import { Router } from 'express';
import { container } from 'tsyringe';
import { TaskController } from '../controllers/task.controller';
import {  taskDependencies, } from '../config/container';
import { ITaskService } from '../interfaces/services/task.service.interface';
taskDependencies()


const router = Router();

// Resolve from container and pass to constructor
const taskService = container.resolve<ITaskService>('ITaskService');
const controller = new TaskController(taskService);

router.post('/create', controller.createTask);
router.get('/user/:userId', controller.getTasksByUser);
router.get('/:taskId', controller.getTaskById);
router.put('/:taskId', controller.updateTask);
router.delete('/:taskId', controller.deleteTask );

export default router;