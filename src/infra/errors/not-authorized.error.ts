import { CustomError } from "./custom.error"

export class NotAuthorizedError extends CustomError {
  public name = 'NotAuthorized'
  public defaultMessage = 'Not Authorized'
  public httpCode = 401

  constructor(message?: string) {
    super(
      message
    )
  }
}