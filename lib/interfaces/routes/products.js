import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/products';

router.route('/')
    .get(makeExpressCb(controller.getProducts))
    .post(makeExpressCb(controller.addProduct))
    .put(makeExpressCb(controller.buy_a_product))

router.route('/:id')
    .get(makeExpressCb(controller.get_product_by_id))
    

router.route('/location/:location')
    .get(makeExpressCb(controller.getProductsByLocation));

module.exports = router;
