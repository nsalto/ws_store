import express from 'express';
const router = express.Router();
import makeExpressCb from '../../infrastructure/api/express-callback';
import controller from '../controllers/health-check';

router.route('/')
  .get(makeExpressCb(controller.healthCheck));

module.exports = router;
