import GenericFactory from './generic-factory';

class GenericSeeder {
  static seed({ name, dir_schema, dir_data }) {
    let factory;
    try {
      console.log(`Seeding dummy ${name} data...`);
      const schema = require(dir_schema);
      const data = require(dir_data);
      const entities = data
        .map(data_seed => GenericFactory.build(data_seed,
          schema));

      factory = GenericFactory.create(entities,
        schema);
    } catch (e) {
      console.error(`ERROR - ${name}: `,
        e);
    }
    return factory;
  };
}

export default GenericSeeder;
