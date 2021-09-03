import express from 'express';
import cookieParser from 'cookie-parser';
import routes from '../../interfaces/routes';
import cors from 'cors';
import { createNamespace } from 'cls-hooked';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const namespace = createNamespace('session');

// Swagger definition
const swaggerDef = {
  info: {
    title: 'API Compras',
  },
  host: process.env.BASE_URL || 'localhost:3000',
  basePath: '/api'
};
// Swagger opts
const options = {
  swaggerDefinition: swaggerDef,
  apis: ['**/docs/routes/*.yaml'],
};

const createServer = async () => {
  function handleContext(req, res, next) {
    namespace.run(() => next());
  }

  const app = express();
  app.use(express.json({ limit: '5MB', extended: true}));
  app.use(express.urlencoded({extended: true, limit: '5MB'}));
  app.use(cors());
  app.use(cookieParser());
  app.use(handleContext);

  const swaggerSpec = swaggerJSDoc(options);
  const env = process.env.NODE_ENV === 'dev' ? '/api' : '/' + process.env.NODE_ENV;
  app.use(`${env}/docs`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec));

  app.use(`${env}`,
    routes);

  if (!process.env.PORT) { process.env.PORT = 3000; }
  const server = app.listen(process.env.PORT);
  return server;
};

module.exports = createServer;
