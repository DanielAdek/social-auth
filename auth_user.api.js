import { generateToken } from '../helpers';

/**
 * @class AuthUserAPI
 */
export class AuthUserAPI {
  /**
   * @author DanielAdek
   * @method loggedInUser
   * @desc Feature re authenticate user
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */
  static getLoggedInUser(req, res) {
    try {
      const { id } = req.user;
      const token = generateToken({ id });
      return res.status(200).jsend.success({ token, user: req.user });
    } catch (error) {
      console.log(req);
      return res.status(500).jsend.error({ error: true, message: error.message });
    }
  }
}
