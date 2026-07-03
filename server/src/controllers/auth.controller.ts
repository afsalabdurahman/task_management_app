import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { IAuthService } from '../interfaces/services/auth.service.interface';


@injectable()
export class AuthController {
  constructor(
    @inject('IAuthService') private authService: IAuthService   // ← @inject decorator
  ) {}

  register = async (req: Request, res: Response) => {
    try {
      const token = await this.authService.register(req.body);
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      res.status(201).json({ success: true, message: "User registered", token });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { token, user } = await this.authService.login(req.body.email, req.body.password);
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      res.json({ success: true, message: "Login successful", token, user });
    } catch (error: any) {
      res.status(401).json({ success: false, message: error.message });
    }
  };
  logout = async (req: Request, res: Response) => {
    console.log("Logout called")
    try {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
      res.json({ success: true, message: "Logout successful" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
}