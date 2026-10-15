import { User, IUser } from '../models/user.model';   
import { BaseRepository } from './base.repository';
import { IUserRepository } from '../interfaces/repositories/user.repository.interface';
import { ITask, Task } from '../models/task.model';
import { ITaskRepository } from '../interfaces/repositories/task.repository.interface';
import { Types } from 'mongoose';

export class TaskRepository extends BaseRepository<ITask> implements ITaskRepository{
  constructor() {
    super(Task);
  }

async findWithPagination(
  filter: Partial<ITask> = {},
  limit: number = 10,
  cursor?: string          // ← Only string (recommended)
): Promise<{
  tasks: ITask[];
  nextCursor: string | null;
  hasMore: boolean;
  counts: {
    total: number;
    completed: number;
    inprogress: number;
    high: number;
  };
}> {
  
  let query = this.model.find(filter);

  // If cursor exists, fetch items after this cursor
  if (cursor) {
    query = query.where('_id').gt(cursor as any );  // Convert string to ObjectId
  }

  const tasks = await query
    .sort({ _id: 1 })           // Change to -1 for newest first
    .limit(limit + 1)
    .exec();

  const hasMore = tasks.length > limit;
  const paginatedTasks = tasks.slice(0, limit);
  
  const nextCursor = hasMore && paginatedTasks.length > 0
    ? paginatedTasks[paginatedTasks.length - 1]._id.toString()
    : null;
const result= await this.model.aggregate([
  { $match: filter },
  {
    $facet: {
      total: [{ $count: "count" }],
      completed: [{ $match: { status: "completed" } }, { $count: "count" }],
      inprogress: [{ $match: { status: "in-progress" } }, { $count: "count" }],
      high: [{ $match: { priority: "high" } }, { $count: "count" }]
    }
  }
]); 

  return {
    tasks: paginatedTasks,
    nextCursor,
    hasMore,
    counts:{
      total: result[0].total.length > 0 ? result[0].total[0].count : 0,
      completed: result[0].completed.length > 0 ? result[0].completed[0].count : 0,
      inprogress: result[0].inprogress.length > 0 ? result[0].inprogress[0].count : 0,
      high: result[0].high.length > 0 ? result[0].high[0].count : 0
    }
  };
}

  async findByEmail(email: string): Promise<ITask | null> {
    return this.model.findOne({ email });
  }
}