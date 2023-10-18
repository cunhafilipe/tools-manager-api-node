import express, { NextFunction, Response, Request } from 'express';
import { CustomError } from './infra/errors/custom.error';
// import { router } from './routes'

const app = express()

// app.use(router)
app.use(express.json())

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
      return response.status(err.httpCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  })

app.listen(3333, ()=> {
  console.log('Server started on port 3333')
})