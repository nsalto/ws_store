import QueryProduct from '../../application/use-cases/store/products';
import ProductRepository from '../../infrastructure/orm/typeorm/repositories/product';
import PurchaseHistoryRepository from '../../infrastructure/orm/typeorm/repositories/purchase-history';
import PersonRepository from '../../infrastructure/orm/typeorm/repositories/person';


async function getProducts() {
  const productRepository = new ProductRepository();
  const useCase = new QueryProduct({
    productRepository
  });

  const product = await useCase.getProducts();

  return {
    statusCode: 200,
    body: product
  };
}


async function getProductsByLocation(httpRequest) {
  const location =  httpRequest.params.location
  const productRepository = new ProductRepository();
  const useCase = new QueryProduct({
    productRepository
  });

  const product = await useCase.getProductsByLocation(location);

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

  const product = await useCase.get_product_by_id(id);
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

  const product = await useCase.createNewProduct(data);

  return {
    statusCode: 200,
    body: product
  };
}

async function buy_a_product(httpRequest) {
  const data = httpRequest.body;
  const productRepository = new ProductRepository();
  const purchaseHistoryRepository = new PurchaseHistoryRepository();
  const personRepository = new PersonRepository();
  
  const useCase = new QueryProduct({
    productRepository,
    purchaseHistoryRepository,
    personRepository
  });

  const product = await useCase.buyProduct(data);

  return {
    statusCode: 200,
    body: product
  };
}


module.exports = {
    getProducts,
    get_product_by_id,
    addProduct,
    getProductsByLocation,
    buy_a_product
};
