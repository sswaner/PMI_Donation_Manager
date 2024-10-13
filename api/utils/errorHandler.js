// utils/errorHandler.js
exports.errorResponse = (res, message, statusCode = 500) => {
    res.status(statusCode).json({
        status: 'error',
        message: message || 'An unexpected error occurred'
    });
};