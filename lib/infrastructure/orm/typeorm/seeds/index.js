import initDB from '../typeorm';
import GenericSeeder from './seeder';

const dir_schema = '../schemas/';
const dir_data = '../data/';
const seeds = [
  /*   { name: 'terms-conditions', dir_schema: dir_schema + 'term-condition', dir_data: dir_data + 'terms-conditions' },*/
  {
    name: 'authoriry',
    dir_schema: dir_schema + 'authority',
    dir_data: dir_data + 'authorities'
  },
  {
    name: 'person-type',
    dir_schema: dir_schema + 'person-type',
    dir_data: dir_data + 'person-types'
  },
  {
    name: 'users',
    dir_schema: dir_schema + 'user',
    dir_data: dir_data + 'users'
  },
  {
    name: 'persons',
    dir_schema: dir_schema + 'person',
    dir_data: dir_data + 'persons'
  }, 
  {
    name: 'user-authorities',
    dir_schema: dir_schema + 'user-authority',
    dir_data: dir_data + 'user-authorities'
  },
];

const seedDB = async () => {
  for (let seed of seeds) {
    await GenericSeeder.seed(seed);
    console.log(`Done ${seed.name}.`);
  }
};

const run = async () => {
  const env = process.env.NODE_ENV;
  if (env !== 'dev' && env !== 'tst') {
    console.log('Avoid running seeders on stg o prd environments.\n');
    /* eslint-disable no-process-exit */
    process.exit(1);
  }

  console.log('Connecting to DB');
  const params = {
    synchronize: true,
    dropSchema: true,
    logging: true
  };

  const conn = await initDB(params);
  console.log('Seeding DB');
  await seedDB();
  console.log('Closing DB');
  return await conn.close();
};

run();
