import passport from 'passport';
import db from '../model';
import GoogleOAuth2 from './google.oauth.config';
import FacebookOAuth from './facebook.oauth.config';

const { Users } = db;

/**
 * @class PSMConfig
 */
class PSMConfig {

  static getPassportSocialMConfig() {
    // Serialize user
    passport.serializeUser((user, done) => done(null, user));

    // Deserialize user
    passport.deserializeUser((id, done) =>
      Users.findOne({ where: { id }}).then((user) => done(null, user)));

    // use google setup
    GoogleOAuth2.configGooglePassport();

    // use facebook setup
    FacebookOAuth.configFacebookPassport();
  }
}

export default PSMConfig;