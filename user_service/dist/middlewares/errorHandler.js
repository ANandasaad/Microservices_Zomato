"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
class HttpError extends Error {
    constructor(message, statusCode, errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
    }
}
const errorHandler = (err, req, res, next) => {
    const statusCode = err instanceof HttpError ? err.statusCode : 500;
    const errorResponse = {
        message: err.message || "Internal Server Error",
        statusCode,
        errors: err instanceof HttpError ? err.errors : [],
    };
    res.status(statusCode).json(errorResponse);
    next();
};
exports.errorHandler = errorHandler;
