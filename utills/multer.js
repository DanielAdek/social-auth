import path from 'path';
import multer from 'multer';
import Datauri from 'datauri';

const storage = multer.memoryStorage();

const multerUploads = multer({ storage });

const dUri = new Datauri();

/**
 * @description This function converts the buffer to data url
 * @param {Object} file containing the file object
 * @returns {String} The data url from the string buffer
 */
const dataUri = file => dUri.format(path.extname(file.originalname).toString(), file.buffer);

export { multerUploads, dataUri };
