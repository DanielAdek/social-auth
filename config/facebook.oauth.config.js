import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import { envManager } from './env.config.manager';
import { UserSocialMediaAuth } from '../auth/auth_user_social_media.api';

class FacebookOAuth extends UserSocialMediaAuth {

  configFacebookPassport() {
    passport.use(new FacebookStrategy({
      clientID: envManager.getEnvValue('FACEBOOK_CLIENT_ID'),
      clientSecret: envManager.getEnvValue('FACEBOOK_SECRET'),
      callbackURL: envManager.getEnvValue('FACEBOOK_CLIENT_CALLBACK_URI')
    }, this.persistOrGetUserProfile));
  }
}

export default new FacebookOAuth();