import { CustomError } from "./custom.error"

export class InvalidDataError extends CustomError {
    public name = 'InvalidData'
    public defaultMessage = 'Invalid parameters'
    public httpCode = 400
  
    constructor(message?: string) {
      super(
        message
    )
      }
  }