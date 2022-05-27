import { Router } from 'express';
import { UserController } from '../controller/user';
import { AuthUserAPI } from '../auth/auth_user.api';
import { verifyToken } from '../middleware/verifyToken';
import { multerUploads } from '../utills/multer';

/**
 * @class userRoutes
 */
export class UserRoutes extends UserController {
  /**
   * @constructor userRoutes
   */
  constructor() {
    super();
    this.router = Router();

    this.useRoutes();
  }

  /**
   * @returns {*} void
   */
  useRoutes() {
    this.router.post('/register', UserRoutes.register);
    this.router.post('/login', UserRoutes.authenticate);
    this.router.get('/auth', verifyToken, AuthUserAPI.getLoggedInUser);
    this.router.put(
      '/update',
      verifyToken,
      multerUploads.single('avatar'),
      this.updateUserProfile
    );
  }
}
