import { Router } from 'express';
import { UserRoutes } from './user.route';
import { GoogleAuthRoutes } from './google.auth.routes';
import { FacebookAuthRoutes } from './facebook.auth.routes';

/**
 * @class routes
 */
class Routes {
  /**
   * @constructor routes
   */
  constructor() {
    this.router = Router();
    this.applicationRoutes();
  }

  /**
   * @return {*} void
   */
  applicationRoutes() {
    this.router.use('/user', new UserRoutes().router);
    this.router.use('/google', new GoogleAuthRoutes().router);
    this.router.use('/facebook', new FacebookAuthRoutes().router);
  }
}

export default new Routes();
