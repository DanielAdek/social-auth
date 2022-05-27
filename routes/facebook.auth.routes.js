import { Router } from 'express';
import passport from 'passport';
import { AuthUserAPI } from '../auth/auth_user.api';

/**
 * @class FacebookAuthRoutes
 */
export class FacebookAuthRoutes {
  /**
   * @constructor FacebookAuthRoutes
   */
  constructor() {
    this.router = Router();

    this.useRoutes();
  }

  /**
   * @returns {*} void
   */
  useRoutes() {
    this.router.get('/oauth', passport.authenticate('facebook', {
      session: false,
      scope: ['profile', 'email']
    }));

    this.router.get('/oauth/callback', passport.authenticate('facebook',
      { successRedirect: '/', failureRedirect: '/error' }),
    AuthUserAPI.getLoggedInUser);
  }
}
