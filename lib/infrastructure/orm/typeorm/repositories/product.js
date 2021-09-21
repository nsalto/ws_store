import CommonRepository from './common';
import ProductSchema from '../schemas/product';
import {getConnection} from "typeorm";

class ProductRepository extends CommonRepository {
  constructor() {
    super(ProductSchema);
  }

  async buyProduct(id_product) {
    const product = await getConnection()
    .getRepository(ProductSchema)
    .createQueryBuilder("product")
    .update("product")
    .set({fixed_assets: () => "fixed_assets - 1"})
    .where("id_product = :id_product", { id_product })
    .execute();

    return product
  }

}

export default ProductRepository;
