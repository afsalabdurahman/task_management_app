import { injectable, inject } from 'tsyringe';
import { IAuthService } from '../interfaces/services/auth.service.interface';
import { IUserRepository } from '../interfaces/repositories/user.repository.interface'; 
import bcrypt from 'bcryptjs';
import { UserResponseDTO } from '../dtos/user.response.dto';
import { validateUser } from '../utils/validators';
import { generateAccessToken } from '../utils/jwt';
import { NotFoundError } from '../utils/errors';
import { MESSAGES } from '../constants/MESSAGES';
import { toUserLoginResponse } from '../dtos/mappers/user.respose.mapper';

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
    await this.userRepo.create({ ...data, password: hashed , isverified: true});
return MESSAGES.USER.CREATED;
   
  }

  async login(email: string, password: string): Promise<{ token: string; user: UserResponseDTO}> {
    const user = await this.userRepo.findByEmail(email)
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new NotFoundError('Invalid credentials');
    }
    console.log("User found:", user);
      const mappedUser: UserResponseDTO = toUserLoginResponse(user);
     console.log("Mapped User:", mappedUser);
    const token = generateAccessToken({userId: user._id.toString(), email: user.email,});
    return { token, user: mappedUser };
  }


}