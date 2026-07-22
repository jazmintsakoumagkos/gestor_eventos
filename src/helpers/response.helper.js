const sendSuccess = (res, statusCode = 200, message = 'Operación exitosa', data = {}) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
};

const sendError = (res, statusCode = 500, message = 'Error interno del servidor') => {
    return res.status(statusCode).json({
        success: false,
        message
    });
};

module.exports = { sendSuccess, sendError };
