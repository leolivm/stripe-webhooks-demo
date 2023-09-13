interface IAppError {
  message: string
  statusCode: number
}

export class AppError {
  public message: string
  public statusCode: number

  constructor({ message, statusCode }: IAppError) {
    this.message = message
    this.statusCode = statusCode
  }
}
