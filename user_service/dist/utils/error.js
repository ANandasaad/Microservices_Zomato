"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.UnauthorizedError = exports.BadRequestError = void 0;
class BadRequestError extends Error {
    constructor(message, error) {
        super(message);
        this.name = "BadRequestError";
        this.statusCode = 400;
        this.errors = error;
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnauthorizedError";
        this.statusCode = 401;
    }
}
exports.UnauthorizedError = UnauthorizedError;
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
        this.statusCode = 404;
    }
}
exports.NotFoundError = NotFoundError;
