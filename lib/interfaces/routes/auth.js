import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/auth';

router.route('/sign-in')
  .post(makeExpressCb(controller.signIn));

router.route('/sign-in-admin')
  .post(makeExpressCb(controller.signInAdmin));

router.route('/sign-in-andina')
  .post(makeExpressCb(controller.signInAndina));

module.exports = router;
