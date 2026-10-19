import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { IAuthService } from '../interfaces/services/auth.service.interface';
import { HTTP_STATUS } from '../constants/HTTP_STATUS_CODE';
import { MESSAGES } from '../constants/MESSAGES';

@injectable()
export class AuthController {
  constructor(
    @inject('IAuthService') private authService: IAuthService   // ← @inject decorator
  ) {}

  register = async (req: Request, res: Response) => {
    
      const token = await this.authService.register(req.body);
       res.status(HTTP_STATUS.CREATED).json({ success: true, message: MESSAGES.USER.CREATED, token });
    
  };

  login = async (req: Request, res: Response) => {
    
      const { token, user } = await this.authService.login(req.body.email, req.body.password);
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
          maxAge: Number(process.env.COOKIE_AGE)
      });
      res.status(HTTP_STATUS.OK).json({ success: true, message: MESSAGES.AUTH.LOGIN_SUCCESS, token, user });
   
  };
  logout = async (req: Request, res: Response) => {
   
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
      res.status(HTTP_STATUS.OK).json({ success: true, message: MESSAGES.AUTH.LOGOUT_SUCCESS });
    
  };
}