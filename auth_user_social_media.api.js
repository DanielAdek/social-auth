import db from '../model';

const { Users } = db;

/**
 * @author DanielAdek
 * @class UserSocialMediaAuth
 */
export class UserSocialMediaAuth {
  /**
   *
   * @param {*} accessToken
   * @param {*} refreshToken
   * @param {*} profile
   * @param {*} done
   * @returns {Function} callback
   */
  async persistOrGetUserProfile(accessToken, refreshToken, profile, done) {
    try {
      // get data to be stored in user table
      const email = profile.emails[0].value;
      const userData = {
        email,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        avatar: profile.photos[0].value,
        googleId: profile.provider === 'google' ? profile.id : null,
        googleAccessToken: profile.provider === 'google' ? accessToken : null,
        facebookId: profile.provider !== 'google' ? profile.id : null,
        facebookAccessToken: profile.provider !== 'google' ? accessToken : null
      };

      // confirm user does not exist before
      const user = await Users.findOne({ where: { email } });

      if (user) {
        const {
          id, firstName, lastName, avatar, googleId,
          googleAccessToken, facebookId, facebookAccessToken
        } = user.dataValues;
        done(null, {
          // eslint-disable-next-line max-len
          id, firstName, lastName, email, avatar, googleId, googleAccessToken, facebookId, facebookAccessToken,
        });
      } else {
        // insert user data in db
        const createdUser = await Users.create(userData);
        done(null, createdUser);
      }
    } catch (error) {
      done(null, error.message);
    }
  }
}
