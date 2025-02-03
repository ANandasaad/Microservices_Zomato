export class BadRequestError extends Error {
  statusCode: number;
  errors?: string[];

  constructor(message: string, error?: string[]) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = 400;
    this.errors = error;
  }
}

export class UnauthorizedError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = 401;
  }
}

export class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}
