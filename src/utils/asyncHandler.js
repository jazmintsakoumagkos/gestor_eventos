/**
 * Envuelve funciones de controladores asíncronas para capturar
 * automáticamente los errores y enviarlos al middleware global
 * de manejo de errores (next(error)), evitando repetir try/catch
 * en cada controlador.
 */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
