export default class UnprocessableContentError extends Error {
  public statusCode: number;
  constructor(
    message: string,
  ) {
    super(message);
    this.statusCode = 422;
  }
}
