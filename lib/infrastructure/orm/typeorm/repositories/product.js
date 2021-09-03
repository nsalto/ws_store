import CommonRepository from './common';
import RestaurantSchema from '../schemas/product';

class RestaurantRepository extends CommonRepository {
  constructor() {
    super(RestaurantSchema);
  }
}

export default RestaurantRepository;
