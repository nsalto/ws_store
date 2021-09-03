import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/persons';

router.route('/sign-up')
  .post(makeExpressCb(controller.signUp));

router.route('/:id')
  .get(makeExpressCb(controller.getPerson));

module.exports = router;
