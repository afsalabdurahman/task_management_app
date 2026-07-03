import { injectable, inject } from 'tsyringe';
import { IAuthService } from '../interfaces/services/auth.service.interface';
import { IUserRepository } from '../interfaces/repositories/user.repository.interface'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user.model';
import { UserResponseDTO } from '../dtos/user.response.dto';
import { validateUser } from '../utils/validators';
import { generateAccessToken } from '../utils/jwt';
import { NotFoundError } from '../utils/errors';

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject('IUserRepository') private userRepo: IUserRepository
  ) {}

  async register(data: { name: string; email: string; password: string }): Promise<string> {
    const isValid = validateUser(data);
    if (!isValid.isValid) {
      throw new Error(Object.values(isValid.errors)[0]);
    }
    const exists = await this.userRepo.findByEmail(data.email);
    if (exists) throw new Error('User already exists');

    const hashed = await bcrypt.hash(data.password, 10);
    const user = await this.userRepo.create({ ...data, password: hashed , isverified: true});
return 'User registered successfully';
    // const token = this.generateToken(user);
    // return token;
  }

  async login(email: string, password: string): Promise<{ token: string; user: UserResponseDTO}> {
    const user = await this.userRepo.findByEmail(email)
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new NotFoundError('Invalid credentials');
    }

    const token = generateAccessToken({userId: user._id.toString(), email: user.email,});
    return { token, user: { ...user.toObject(), id: user._id } };
  }


}