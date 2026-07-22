const ApiError = require('../utils/ApiError');

const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    if (err.name === 'ValidationError') {
        const primerMensaje = Object.values(err.errors)[0]?.message || 'Datos inválidos';
        return res.status(400).json({
            success: false,
            message: primerMensaje
        });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            message: `El valor '${err.value}' no es un identificador válido`
        });
    }

    console.error('Error no controlado:', err);
    return res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
    });
};

module.exports = errorHandler;
