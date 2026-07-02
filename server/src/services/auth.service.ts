import { injectable, inject } from 'tsyringe';
import { IAuthService } from '../interfaces/services/auth.service.interface';
import { IUserRepository } from '../interfaces/repositories/user.repository.interface'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user.model';
import { UserResponseDTO } from '../dtos/user.response.dto';

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject('IUserRepository') private userRepo: IUserRepository
  ) {}

  async register(data: { name: string; email: string; password: string }): Promise<string> {
    const exists = await this.userRepo.findByEmail(data.email);
    if (exists) throw new Error('User already exists');

    const hashed = await bcrypt.hash(data.password, 10);
    const user = await this.userRepo.create({ ...data, password: hashed , isverified: true});

    const token = this.generateToken(user);
    return token;
  }

  async login(email: string, password: string): Promise<{ token: string; user: UserResponseDTO}> {
    const user = await this.userRepo.findByEmail(email)
    console.log('User found:', user);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user);
    return { token, user: { ...user.toObject(), id: user._id } };
  }

  private generateToken(user: IUser): string {
    return jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
  }
}