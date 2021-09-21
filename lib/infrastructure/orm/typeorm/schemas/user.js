import { EntitySchema } from 'typeorm';
import config from '../../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'user',
  tableName: `${config.DB.PREFIX}_USERS`,
  columns: {
    ...baseColumns,
    id_user: {
      primary: true,
      type: 'int',
      generated: true,
    },
    employee_file: {
      type: 'varchar'
    },
    email: {
      type: 'varchar',
    },
    password: {
      type: 'varchar',
      select: false,
      default: null
    },
    validationHash: {
      type: 'varchar',
      default: null
    },
    recoverPasswordHash: {
      type: 'varchar',
      default: null
    },
    recoverPasswordDateTill: {
      type: 'timestamp',
      default: null
    },
    verified: {
      type: 'boolean',
    }
  },
  relations: {
    authorities: {
      type: 'one-to-many',
      target: 'userAuthority',
      inverseSide: 'user'
    },
  },
});
