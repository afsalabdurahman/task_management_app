import { container } from "tsyringe";

import { IAuthService } from "../interfaces/services/auth.service.interface";
import { IUserRepository } from "../interfaces/repositories/user.repository.interface";

import { AuthService } from "../services/auth.service";
import { UserRepository } from "../repositories/user.repository";
import { TaskRepository } from "../repositories/task.repository";
import { ITaskRepository } from "../interfaces/repositories/task.repository.interface";
import { TaskService } from "../services/task.service";
import { ITaskService } from "../interfaces/services/task.service.interface";

export const registerDependencies = () => {
  container.register<IAuthService>("IAuthService", {
    useClass: AuthService,
  });

  container.register<IUserRepository>("IUserRepository", {
    useClass: UserRepository,
  });
};
export const taskDependencies = () => {
  container.register<ITaskService>("ITaskService", {
    useClass: TaskService,
  });

  container.register<ITaskRepository>("ITaskRepository", {
    useClass: TaskRepository,
  });
};