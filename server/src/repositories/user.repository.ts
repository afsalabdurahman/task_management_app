import { User, IUser } from '../models/user.model';   
import { BaseRepository } from './base.repository';
import { IUserRepository } from '../interfaces/repositories/user.repository.interface';

export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.model.findOne({ email });
  }
}