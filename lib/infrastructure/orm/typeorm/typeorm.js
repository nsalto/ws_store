import 'reflect-metadata';
import { createConnection } from 'typeorm';
import dbConfig from './ormconfig';

async function initDB(params = {}) {
  let conn = null;
  try {
    dbConfig.password = await dbConfig.password;
    /* eslint-disable no-return-assign */
    Object.keys(params).forEach((key) => dbConfig[key] = params[key]);
    conn = createConnection(dbConfig);
  } catch (error) {
    console.log('Error: ',
      error);
    throw error;
  }
  return conn;
}

export default initDB;
