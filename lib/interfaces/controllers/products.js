import QueryProduct from '../../application/use-cases/store/products';
import ProductRepository from '../../infrastructure/orm/typeorm/repositories/product';


async function getProducts() {
  const productRepository = new ProductRepository();
  const useCase = new QueryProduct({
    productRepository
  });

  const product = await useCase.getRestaurants();

  return {
    statusCode: 200,
    body: product
  };
}

async function get_product_by_id(httpRequest) {
  // Arrange
  const id = httpRequest.params.id;
  const productRepository = new ProductRepository();
  const useCase = new QueryProduct({
    productRepository
  });

  const product = await useCase.get_restaurant_by_id(id);
  if (product === true)
    return {
      //headers,
      statusCode: 200,
      body: product
    };
  else
    return {
      //headers,
      statusCode: 200,
      body: product
    };
}

async function addProduct(httpRequest) {
  const data = httpRequest.body;
  const productRepository = new ProductRepository();
  const useCase = new QueryProduct({
    productRepository
  });

  const product = await useCase.createNewRestaurant(data);

  return {
    statusCode: 200,
    body: product
  };
}


module.exports = {
    getProducts,
    get_product_by_id,
    addProduct,
};
