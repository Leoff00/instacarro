export class DomainError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 500
  ) {
    super(message);
  }
}
