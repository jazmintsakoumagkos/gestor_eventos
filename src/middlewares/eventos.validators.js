const { body, param } = require('express-validator');
const mongoose = require('mongoose');

const validarObjectId = (campo = 'id') =>
    param(campo).custom((value) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error('El identificador proporcionado no es válido');
        }
        return true;
    });

const crearEventoValidator = [
    body('nombre')
        .trim()
        .notEmpty()
        .withMessage('El nombre del evento es obligatorio')
        .isLength({ min: 3 })
        .withMessage('El nombre debe tener al menos 3 caracteres'),

    body('fecha')
        .notEmpty()
        .withMessage('La fecha del evento es obligatoria')
        .isISO8601()
        .withMessage('La fecha debe tener un formato válido (YYYY-MM-DD)'),

    body('descripcion').optional().isString(),

    body('lugar').optional().isString(),

    body('capacidadMaxima')
        .optional()
        .isInt({ min: 1 })
        .withMessage('La capacidad máxima debe ser un número positivo'),

    body('entradasDisponibles')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Las entradas disponibles deben ser un número positivo')
        .custom((value, { req }) => {
            const { capacidadMaxima } = req.body;
            if (capacidadMaxima !== undefined && Number(value) > Number(capacidadMaxima)) {
                throw new Error('Las entradas disponibles no pueden superar la capacidad máxima');
            }
            return true;
        })
];

const actualizarEventoValidator = [
    validarObjectId('id'),

    body('nombre')
        .optional()
        .trim()
        .isLength({ min: 3 })
        .withMessage('El nombre debe tener al menos 3 caracteres'),

    body('fecha')
        .optional()
        .isISO8601()
        .withMessage('La fecha debe tener un formato válido (YYYY-MM-DD)'),

    body('capacidadMaxima')
        .optional()
        .isInt({ min: 1 })
        .withMessage('La capacidad máxima debe ser un número positivo'),

    body('entradasDisponibles')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Las entradas disponibles deben ser un número positivo')
        .custom((value, { req }) => {
            const { capacidadMaxima } = req.body;
            if (capacidadMaxima !== undefined && Number(value) > Number(capacidadMaxima)) {
                throw new Error('Las entradas disponibles no pueden superar la capacidad máxima');
            }
            return true;
        })
];

const idParamValidator = [validarObjectId('id')];

const registrarParticipanteValidator = [
    validarObjectId('id'),

    body('nombre').trim().notEmpty().withMessage('El nombre del participante es obligatorio'),

    body('email').trim().isEmail().withMessage('El email proporcionado no es válido')
];

const fechaParamValidator = [
    param('fecha')
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .withMessage('La fecha debe tener el formato YYYY-MM-DD')
];

module.exports = {
    crearEventoValidator,
    actualizarEventoValidator,
    idParamValidator,
    registrarParticipanteValidator,
    fechaParamValidator
};
