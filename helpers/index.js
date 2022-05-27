import { config } from 'dotenv';
import JWT from 'jsonwebtoken';

config();

const secret = process.env.SECRET;

/**
 * @desc GENERATE TOKEN FOR AUTHORIZATION
 * @param {object} payload THE DATA TO BE CONTAINED IN THE TOKEN
 * @returns {string} STRING
 */
export const generateToken = payload => `Bearer ${JWT.sign(payload, secret, { expiresIn: '24h' })}`;