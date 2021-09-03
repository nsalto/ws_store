import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/products';

router.route('/')
    .get(makeExpressCb(controller.getProducts))
    .post(makeExpressCb(controller.addProduct));

router.route('/:id')
    .get(makeExpressCb(controller.get_product_by_id))

module.exports = router;
