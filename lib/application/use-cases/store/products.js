import { InvalidPropertyError } from '../../../infrastructure/helpers/errors';
import _ from 'lodash';

class QueryProduct {
  constructor({ productRepository }) {
    this.productRepository = productRepository;
}

  async getProducts() {
    const restaurants = await this.productRepository.findAll({
      fields: ['id_restaurant', 'name', 'cuit', ],
      relations: ['user']
    });
    return restaurants;
  }

  async get_product_by_id(id) {
    const id_restaurant = await this.productRepository.getRestaurantById(id);

    if (!id_restaurant) {
      throw new InvalidPropertyError(`The restaurant with id ${id} does not exist.`,
        'not-exist');
    }
    return id_restaurant;
  }

  async addProduct(body) {
    const restaurant = await this.productRepository.create(body);

    if(!restaurant) {
      throw new InvalidPropertyError(`the restaurant could not be created`);
    }
    return restaurant;
  }

}

export default QueryProduct;
