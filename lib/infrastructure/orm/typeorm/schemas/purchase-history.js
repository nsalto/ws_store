import { EntitySchema } from 'typeorm';
import config from '../../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'purchase_history',
  tableName: `${config.DB.PREFIX}_PURCHASE_HISTORY`,
  columns: {
    ...baseColumns,
    id_purchase_history: {
      primary: true,
      type: 'int',
      generated: true,
    },
  },
  relations: {
    person: {
      type: 'many-to-one',
      target: 'person',
      joinColumn: {
        name: 'id_person'
      },
    },
    product: {
      type: 'many-to-one',
      target: 'product',
      joinColumn: {
        name: 'id_product'
      },
    },
  },
});
