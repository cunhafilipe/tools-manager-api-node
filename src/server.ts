import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { routes } from '../src/presentation/routes/index';
import { CustomError } from './infra/errors/custom.error';

const app = express()

app.use(express.json())
app.use(routes)

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Tools Manager API Documentation',
      version: '1.0.0',
      description: 'API development to manager tools technologies',
    },
  },
  apis: ['src/presentation/routes/*.ts'],
};

const specs = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));


app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
      return response.status(err.httpCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error`,
      error: err.message
    });
  })

app.listen(3333, () => {
  console.log('Server started on port 3333')
})