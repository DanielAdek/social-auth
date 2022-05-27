import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import Sequelize from 'sequelize';
import configPath from '../sequelize.json';


const db = {};
const env = process.env.NODE_ENV;
const config = configPath[env];

const basename = path.basename(module.filename);

const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.authenticate()
  .then(() => console.log('connected to database'))
  .catch(err => console.log(err.message));

export default db;
