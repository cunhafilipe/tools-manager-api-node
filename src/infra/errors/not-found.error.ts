import { CustomError } from "./custom.error"

export class NotFoundError extends CustomError {
    public name = 'NotFound'
    public defaultMessage = 'Not found data'
    public httpCode = 404
  
    constructor(message?: string) {
      super(
        message
    )
      }
  }