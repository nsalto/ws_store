import { EntitySchema } from 'typeorm';
import config from '../../../config/env';
import baseColumns from '../base-columns';

module.exports = new EntitySchema({
  name: 'product',
  tableName: `${config.DB.PREFIX}_PRODUCT`,
  columns: {
    ...baseColumns,
    id_product: {
      primary: true,
      type: 'int',
      generated: true,
    },
    type:{
      type: 'varchar',
    },
    serial_number: {
      type: 'varchar'
    },
    brand: {
      type: 'varchar'
    },
    model: {
      type: 'varchar',
    },
    location: {
      type: 'varchar',
    },
    status: {
      type: 'varchar',
    },
    location_sotre: {
      type: 'varchar',
    },
    patrimony: {
      type: 'varchar',
    },
    fixed_assets: {
      type: 'varchar'
    },
    acquired_value: {
      type: 'varchar'
    },
    acc_amort: {
      type: 'varchar'
    },
    cont_val: {
      type: 'varchar'
    }
  },
  relations: {
    purchase_history: {
      type: 'one-to-many',
      target: 'purchase_history',
      inverseSide: 'product',
    },
  }
});
