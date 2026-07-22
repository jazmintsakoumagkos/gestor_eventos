const { Router } = require('express');
const controller = require('../controllers/eventos.controller');
const validateFields = require('../middlewares/validateFields');
const {
    crearEventoValidator,
    actualizarEventoValidator,
    idParamValidator,
    registrarParticipanteValidator,
    fechaParamValidator
} = require('../middlewares/eventos.validators');

const router = Router();


router.get('/disponibles', controller.obtenerEventosDisponibles);

router.get(
    '/fecha/:fecha',
    fechaParamValidator,
    validateFields,
    controller.buscarEventosPorFecha
);

router.post('/', crearEventoValidator, validateFields, controller.crearEvento);

router.get('/', controller.obtenerEventos);

router.get('/:id', idParamValidator, validateFields, controller.obtenerEventoPorId);

router.put('/:id', actualizarEventoValidator, validateFields, controller.actualizarEvento);

router.delete('/:id', idParamValidator, validateFields, controller.eliminarEvento);

router.post(
    '/:id/registrar',
    registrarParticipanteValidator,
    validateFields,
    controller.registrarParticipante
);

module.exports = router;
