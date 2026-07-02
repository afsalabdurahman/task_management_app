import { IBaseRepository } from '../repositories/base.repository.interface';
import { IUser } from '../../models/user.model';

export interface IUserRepository extends IBaseRepository<IUser> {
  findByEmail(email: string): Promise<IUser | null>;
}