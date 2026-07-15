import { IBaseRepository } from '../repositories/base.repository.interface';
import { ITask } from '../../models/task.model';


export interface ITaskRepository extends IBaseRepository<ITask> {
  findByEmail(email: string): Promise<ITask | null>;
  findWithPagination(filter?: Partial<ITask>, limit?: number, cursor?: string): Promise<{ tasks: ITask[]; nextCursor: string | null; hasMore: boolean; counts: { total: number; completed: number; inprogress: number; high: number; } }>;
}