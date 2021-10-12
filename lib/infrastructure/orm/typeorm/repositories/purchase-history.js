import CommonRepository from './common';
import PurchaseHistorySchema from '../schemas/purchase-history';
import {getConnection} from "typeorm";

class PurchaseHistoryRepository extends CommonRepository {
  constructor() {
    super(PurchaseHistorySchema);
  }

  async historyPurchase(data) {
    const id_product = data.id_product;
    const id_person = data.id_person;

    const newHistory = await getConnection()
    .getRepository(PurchaseHistorySchema)
    .createQueryBuilder()
    .insert()
    .into(PurchaseHistorySchema)
    .values({person, product})
    .execute();

    return newHistory
  }

}

export default PurchaseHistoryRepository;
