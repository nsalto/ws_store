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
    name:{
      type: 'varchar',
    },
    description: {
      type: 'varchar'
    },
    stock: {
      type: 'int',
    },
    price: {
      type: 'varchar',
    },
  },
});
