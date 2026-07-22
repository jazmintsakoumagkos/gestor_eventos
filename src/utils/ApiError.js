/**
 * Clase de error personalizada para manejar errores de forma
 * consistente a través de toda la aplicación.
 *
 * Se utiliza junto con el middleware errorHandler para devolver
 * respuestas JSON uniformes al cliente.
 */
class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.success = false;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ApiError;
