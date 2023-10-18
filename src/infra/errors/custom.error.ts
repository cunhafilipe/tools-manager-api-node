export abstract class CustomError extends Error {
    public abstract defaultMessage: string
    public abstract httpCode: number

    constructor(message?: string) {
      super(message)
      Object.defineProperty(this, 'message', { enumerable: true })
    }
  }
  