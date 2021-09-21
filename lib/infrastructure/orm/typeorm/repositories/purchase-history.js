import CommonRepository from './common';
import PurchaseHistorySchema from '../schemas/purchase-history';

class PurchaseHistoryRepository extends CommonRepository {
  constructor() {
    super(PurchaseHistorySchema);
  }

}

export default PurchaseHistoryRepository;
