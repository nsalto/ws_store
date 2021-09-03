import { EntitySchema } from 'typeorm';
import config from '../../../config/env';

module.exports = new EntitySchema({
  name: 'personType',
  tableName: `${config.DB.PREFIX}_PERSONS_TYPE`,
  columns: {
    id_person_type: {
      primary: true,
      type: 'int',
      generated: true,
    },
    description: {
      type: 'varchar',
    },
  },
  relations: {
    persons: {
      type: 'one-to-many',
      target: 'person',
    },
  },
});
