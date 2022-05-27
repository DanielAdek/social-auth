import { Router } from "express";
import passport from "passport";
import { AuthUserAPI } from "../auth/auth_user.api";

/**
 * @class GoogleAuthRoutes
 */
export class GoogleAuthRoutes {
  /**
   * @constructor GoogleAuthRoutes
   */
  constructor() {
    this.router = Router();

    this.useRoutes();
  }

  /**
   * @returns {*} void
   */
  useRoutes() {
    this.router.get(
      "/oauth",
      passport.authenticate("google", {
        session: false,
        scope: ["profile", "email"],
      })
    );

    this.router.get(
      "/oauth/callback",
      passport.authenticate("google", {
        failureRedirect: "/oauth",
      }),
      AuthUserAPI.getLoggedInUser
    );
  }
}
