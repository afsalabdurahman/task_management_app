import { IBaseRepository } from '../repositories/base.repository.interface';
import { ITask } from '../../models/task.model';


export interface ITaskRepository extends IBaseRepository<ITask> {
  findByEmail(email: string): Promise<ITask | null>;
}