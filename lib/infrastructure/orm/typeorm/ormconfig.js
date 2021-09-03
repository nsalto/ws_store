import fs from 'fs';
import config from '../../config/env';

const dir = __dirname + '/schemas/';
const schemas = fs
  .readdirSync(dir)
  .filter((file) => file.indexOf('.') !== 0 && file !== 'index.js')
  .map((file) => file.replace('.js',
    ''));

const dev_envs = ['local', 'dev', 'tst'];
const env = process.env.NODE_ENV.trim();
let password;
if (dev_envs.some((node_env) => node_env === env)) {
  password = config.DB.PSW_KEY;
} else {
  const aws = new AWS();
  password = aws.retriveKey({ key: config.DB.PSW_KEY });
}
const dbConfig = {
  type: config.DB.TYPE,
  host: config.DB.HOST,
  port: config.DB.PORT,
  username: config.DB.USERNAME,
  password,
  database: config.DB.NAME,
  synchronize: config.DB.SYNC,
  logging: config.DB.LOG,
  entities: schemas.map((schema) => require(dir + schema)),
};

export default dbConfig;
