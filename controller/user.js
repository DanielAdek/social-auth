import db from '../model';
import { generateToken } from '../helpers/index';
import { dataUri } from '../utills/multer';


const { Users, Wallet } = db;

/**
 * @class UserController
 *
 */
export class UserController {
  /**
   * @desc register user
   * @param {*} req
   * @param {*} res
   * @return {obj} json
   */
  static async register(req, res) {
    try {
      const {
        firstName, lastName, email, password, phone
      } = req.body;

      const foundUser = await Users.findOne({ where: { email } });

      if (foundUser) {
        return res.status(409).jsend.fail({ message: 'Email already exist' });
      }

      const user = await Users.create({
        firstName, lastName, email, password, phone
      });

      const token = generateToken({ id: user.id });

      const { avatar, id } = user;

      return res.status(201).jsend.success({
        user: {
          id, avatar, email, firstName, lastName, phone
        },
        token
      });
    } catch (err) {
      return res.status(500).jsend.fail({ message: err.message });
    }
  }

  /**
   * @desc authenticate
   * @param {*} req
   * @param {*} res
   * @return {obj} json
   */
  static async authenticate(req, res) {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ where: { email } });

      if (!user) {
        return res.status(401).jsend.fail({ message: 'Bad Credentials' });
      }
      const passwordMatch = await Users.checkPassword(password, user);

      if (!passwordMatch) {
        return res.status(401).jsend.fail({ message: 'Bad Credentials' });
      }
      const token = generateToken({ id: user.id });

      const {
        avatar, id, firstName, lastName, phone
      } = user;

      return res.status(201).jsend.success({
        user: {
          id, avatar, email, firstName, lastName, phone
        },
        token
      });
    } catch (err) {
      return res.status(500).jsend.fail({ message: err.message });
    }
  }

  /**
   * @method updateUserProfile
   * @desc Feature will update user data
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
  */
  async updateUserProfile(req, res) {
    try {
      const {
        email, firstName, lastName, phone, dob, location
      } = req.body;

      const { id } = req.user;

      const user = await Users.findOne({ where: { id } });

      if (!user)
        return res.status(401).jsend.fail({ message: 'User not found' });

      let avatar;
      if (req.file) {
        const file = dataUri(req.file);
        // edit this line to save image file somewhere
        avatar = "image";
      }

      const dataToUpdate = {};

      if (firstName)
        dataToUpdate.firstName = firstName;

      if (lastName)
        dataToUpdate.lastName = lastName;

      if (email)
        dataToUpdate.email = email;

      if (phone)
        dataToUpdate.phone = phone;

      if (dob)
        dataToUpdate.dob = dob;

      if (location)
        dataToUpdate.location = location;

      if (avatar)
        dataToUpdate.avatar = avatar;

      await Users.update(dataToUpdate, { where: { id } });

      return res.status(200).jsend.success({ updated_fields: dataToUpdate });
    } catch (error) {
      return res.status(500).jsend.error({ message: error.message });
    }
  }
}
