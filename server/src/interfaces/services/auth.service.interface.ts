import { IUser} from '../../models/user.model';

export interface IAuthService {
  register(data: { name: string; email: string; password: string }): Promise<string>;
  login(email: string, password: string): Promise<{ token: string; user: UserResponseDTO}>;
}