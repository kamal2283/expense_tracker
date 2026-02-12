"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
exports.errorHandler = errorHandler;
class HttpError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.HttpError = HttpError;
function errorHandler(err, _req, res, _next) {
    const statusCode = err instanceof HttpError ? err.statusCode : 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({ message });
}
