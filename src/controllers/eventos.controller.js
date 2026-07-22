const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../helpers/response.helper');
const eventosService = require('../services/eventos.service');

const crearEvento = asyncHandler(async (req, res) => {
    const evento = await eventosService.crearEvento(req.body);
    return sendSuccess(res, 201, 'Evento creado correctamente', evento);
});

const obtenerEventos = asyncHandler(async (req, res) => {
    const { nombre, lugar, fecha, page, limit, sort } = req.query;
    const { eventos, paginacion } = await eventosService.obtenerEventos({
        nombre,
        lugar,
        fecha,
        page,
        limit,
        sort
    });

    return sendSuccess(res, 200, 'Eventos obtenidos correctamente', {
        eventos,
        paginacion
    });
});

const obtenerEventoPorId = asyncHandler(async (req, res) => {
    const evento = await eventosService.obtenerEventoPorId(req.params.id);
    return sendSuccess(res, 200, 'Evento obtenido correctamente', evento);
});

const actualizarEvento = asyncHandler(async (req, res) => {
    const evento = await eventosService.actualizarEvento(req.params.id, req.body);
    return sendSuccess(res, 200, 'Evento actualizado correctamente', evento);
});

const eliminarEvento = asyncHandler(async (req, res) => {
    await eventosService.eliminarEvento(req.params.id);
    return sendSuccess(res, 200, 'Evento eliminado correctamente', {});
});

const registrarParticipante = asyncHandler(async (req, res) => {
    const evento = await eventosService.registrarParticipante(req.params.id, req.body);
    return sendSuccess(res, 200, 'Participante registrado correctamente', evento);
});

const obtenerEventosDisponibles = asyncHandler(async (req, res) => {
    const eventos = await eventosService.obtenerEventosDisponibles();
    return sendSuccess(res, 200, 'Eventos disponibles obtenidos correctamente', eventos);
});

const buscarEventosPorFecha = asyncHandler(async (req, res) => {
    const eventos = await eventosService.buscarEventosPorFecha(req.params.fecha);
    return sendSuccess(res, 200, 'Eventos encontrados correctamente', eventos);
});

module.exports = {
    crearEvento,
    obtenerEventos,
    obtenerEventoPorId,
    actualizarEvento,
    eliminarEvento,
    registrarParticipante,
    obtenerEventosDisponibles,
    buscarEventosPorFecha
};
