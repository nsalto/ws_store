import { InvalidPropertyError } from '../../../infrastructure/helpers/errors';
import _ from 'lodash';

class QueryProduct {
  constructor({ productRepository, purchaseHistoryRepository }) {
    this.productRepository = productRepository;
    this.purchaseHistoryRepository = purchaseHistoryRepository;
}

  async getProducts() {
    const products = await this.productRepository.findAll({
      fields: ['id_product', 'brand', 'model', 'location' ],
    });
    return products;
  }

  async getProductsByLocation(location) {
    const products = await this.productRepository.findAll({
      fields: ['id_product', 'brand', 'model', 'location' ],
      where: {location: location}
    });

    return products;
  }

  async get_product_by_id(id) {
    const id_product = await this.productRepository.getProductById(id);

    if (!id_product) {
      throw new InvalidPropertyError(`The product with id ${id} does not exist.`,
        'not-exist');
    }
    return id_product;
  }

  async addProduct(body) {
    const product = await this.productRepository.create(body);

    if(!product) {
      throw new InvalidPropertyError(`the product could not be created`);
    }
    return product;
  }

  
  async buyProduct(data) {
    console.log(data)
    const id_product = data.id_product;
    const id_person = data.id_person;

    const purchaseHistory = await this.purchaseHistoryRepository.save(data);
    const product = await this.productRepository.buyProduct(id_product);
    
    if(!product) {
      throw new InvalidPropertyError(`the product could not be updated`);
    }

    if(!purchaseHistory) {
      throw new InvalidPropertyError('the productHistory could not be created')
    }

    console.log(purchaseHistory, product)
    return purchaseHistory;
  }

}

export default QueryProduct;
