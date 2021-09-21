import { EntitySchema } from 'typeorm';
import config from '../../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'person',
  tableName: `${config.DB.PREFIX}_PERSONS`,
  columns: {
    ...baseColumns,
    id_person: {
      primary: true,
      type: 'int',
      generated: true
    },
    first_name: {
      type: 'varchar'
    },
    last_name: {
      type: 'varchar'
    },
    company_name: {
      type: 'varchar',
      nullable: true
    },
    location: {
      type: 'varchar',
      default: "Montecristo"
    },
  },
  relations: {
    user: {
      type: 'one-to-one',
      target: 'user',
      joinColumn: {
        name: 'id_user'
      }
    },
    personType: {
      type: 'many-to-one',
      target: 'personType',
      joinColumn: {
        name: 'id_person_type'
      }
    },
    purchase_history: {
      type: 'one-to-many',
      target: 'purchase_history',
      inverseSide: 'person'
    },
  }
});
