import { config } from 'dotenv';
import JWT from 'jsonwebtoken';
import db from '../model';

const { Users } = db;

config();

const secret = process.env.SECRET;

/**
 * @desc Token validator
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {object} JSON
 */
export const verifyToken = (req, res, next) => {
  try {
    const tokenBearer = req.headers.authorization;
    if (!tokenBearer) {
      return res.status(403).jsend.fail({ status: 403, message: 'Client key required' });
    }

    const token = tokenBearer.split(' ')[1];

    JWT.verify(token, secret, async (err, decoded) => {
      if (err) {
        return res.status(403).jsend.fail({ status: 403, message: 'Invalid key' });
      }
      const user = await Users.findOne({ where: { id: decoded.id } });

      if (!user) {
        return res.status(403).jsend.fail({ status: 404, message: 'User not exist' });
      }

      req.user = user;

      next();
    });
  } catch (error) {
    return res.status(500).jsend.fail({ message: error.message });
  }
};
