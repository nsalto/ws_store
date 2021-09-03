import { EntitySchema } from 'typeorm';
import config from '../../../config/env';

module.exports = new EntitySchema({
  name: 'authority',
  tableName: `${config.DB.PREFIX}_AUTHORITY`,
  columns: {
    id_authority: {
      primary: true,
      type: 'int',
      generated: true,
    },
    description: {
      type: 'varchar',
    },
  },
  relations: {
    userAuthorities: {
      type: 'one-to-many',
      target: 'userAuthority',
      inverseSide: 'authority'
    },
  },
});
