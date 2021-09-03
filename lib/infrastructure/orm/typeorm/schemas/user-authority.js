import { EntitySchema } from 'typeorm';
import config from '../../../config/env';

module.exports = new EntitySchema({
  name: 'userAuthority',
  tableName: `${config.DB.PREFIX}_USER_AUTHORITY`,
  columns: {
    id_user_authority: {
      primary: true,
      type: 'int',
      generated: true,
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'user',
      joinColumn: {
        name: 'id_user',
      },
    },
    authority: {
      type: 'many-to-one',
      target: 'authority',
      joinColumn: {
        name: 'id_authority',
      },
    },
  },
});
