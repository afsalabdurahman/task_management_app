import { User, IUser } from '../models/user.model';   
import { BaseRepository } from './base.repository';
import { IUserRepository } from '../interfaces/repositories/user.repository.interface';
import { ITask, Task } from '../models/task.model';
import { ITaskRepository } from '../interfaces/repositories/task.repository.interface';

export class TaskRepository extends BaseRepository<ITask> implements ITaskRepository{
  constructor() {
    super(Task);
  }

  async findByEmail(email: string): Promise<ITask | null> {
    return this.model.findOne({ email });
  }
}