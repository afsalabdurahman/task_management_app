import { Router } from 'express';
import { container } from 'tsyringe';
import { AuthController } from '../controllers/auth.controller';
import { IAuthService } from '../interfaces/services/auth.service.interface';
import { registerDependencies } from '../config/container';

registerDependencies();
const router = Router();

// Resolve from container and pass to constructor
const authService = container.resolve<IAuthService>('IAuthService');
const controller = new AuthController(authService);

router.post('/register', controller.register);
router.post('/login', controller.login);

export default router;