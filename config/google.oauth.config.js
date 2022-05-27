import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import { envManager } from './env.config.manager';
import { UserSocialMediaAuth } from '../auth/auth_user_social_media.api';

class GoogleOAuth2 extends UserSocialMediaAuth {

  configGooglePassport() {
    passport.use(new GoogleStrategy({
      clientID: envManager.getEnvValue('GOOGLE_CLIENT_ID'),
      clientSecret: envManager.getEnvValue('GOOGLE_SECRET'),
      callbackURL: envManager.getEnvValue('GOOGLE_CLIENT_CALLBACK_URI')
    }, this.persistOrGetUserProfile));
  }
}

export default new GoogleOAuth2()