import { getRepository } from 'typeorm';

class CommonRepository {
  constructor(schema) {
    this.conn = getRepository(schema);
  }

  async findOne({ fields, relations, where, order }) {
    const object = await this.conn
      .findOne({
        relations,
        select: fields,
        where,
        order
      });
    return object;
  }

  async findOneWithRelations({ fields, relations, where }) {
    const object = await this.conn.findOne(where,
      {
        select: fields,
        relations: relations,
      });
    return object;
  }

  async findAll({ fields, where, order, skip, take, relations, join }) {
    const objects = await this.conn.find({
      relations,
      join,
      select: fields,
      where: where,
      order: order,
      skip: skip,
      take
    });
    return objects;
  }

  async findAllWithRelations({
    fields,
    relations,
    join,
    skip,
    where,
    take
  }) {
    const objects = await this.conn.findAndCount({ where: where, select: fields, relations: relations, skip: skip, take: take, join: join });
    return objects;
  }

  async save(data, options) {
    const objects = await this.conn.save(data,
      options);
    return objects;
  }

  async update(criteria, data) {
    const objects = await this.conn.update(criteria,
      data);
    return objects;
  }

  async delete(id) {
    const objects = await this.conn.delete(id);
    return objects;
  }
}

export default CommonRepository;
