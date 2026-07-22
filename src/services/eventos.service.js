const Evento = require('../models/Evento');
const ApiError = require('../utils/ApiError');

const crearEvento = async (datosEvento) => {
    if (
        datosEvento.capacidadMaxima !== undefined &&
        datosEvento.entradasDisponibles === undefined
    ) {
        datosEvento.entradasDisponibles = datosEvento.capacidadMaxima;
    }

    const evento = new Evento(datosEvento);
    return await evento.save();
};

const obtenerEventos = async ({ nombre, lugar, fecha, page = 1, limit = 10, sort }) => {
    const filtro = {};

    if (nombre) {
        filtro.nombre = { $regex: nombre, $options: 'i' };
    }

    if (lugar) {
        filtro.lugar = { $regex: lugar, $options: 'i' };
    }

    if (fecha) {
        const inicioDia = new Date(`${fecha}T00:00:00.000Z`);
        const finDia = new Date(`${fecha}T23:59:59.999Z`);
        filtro.fecha = { $gte: inicioDia, $lte: finDia };
    }

    const pageNumber = Math.max(parseInt(page, 10) || 1, 1);
    const limitNumber = Math.max(parseInt(limit, 10) || 10, 1);
    const skip = (pageNumber - 1) * limitNumber;

    const sortOption = sort ? sort.split(',').join(' ') : '-createdAt';

    const [eventos, total] = await Promise.all([
        Evento.find(filtro).sort(sortOption).skip(skip).limit(limitNumber),
        Evento.countDocuments(filtro)
    ]);

    return {
        eventos,
        paginacion: {
            total,
            page: pageNumber,
            limit: limitNumber,
            totalPages: Math.ceil(total / limitNumber)
        }
    };
};

const obtenerEventoPorId = async (id) => {
    const evento = await Evento.findById(id);
    if (!evento) {
        throw new ApiError(404, 'Evento no encontrado');
    }
    return evento;
};

const actualizarEvento = async (id, datosActualizados) => {
    const evento = await Evento.findByIdAndUpdate(id, datosActualizados, {
        new: true,
        runValidators: true
    });

    if (!evento) {
        throw new ApiError(404, 'Evento no encontrado');
    }

    return evento;
};

const eliminarEvento = async (id) => {
    const evento = await Evento.findByIdAndDelete(id);
    if (!evento) {
        throw new ApiError(404, 'Evento no encontrado');
    }
    return evento;
};

const registrarParticipante = async (id, { nombre, email }) => {
    const evento = await Evento.findById(id);

    if (!evento) {
        throw new ApiError(404, 'Evento no encontrado');
    }

    if (!evento.entradasDisponibles || evento.entradasDisponibles <= 0) {
        throw new ApiError(400, 'No hay entradas disponibles para este evento');
    }

    const yaRegistrado = evento.participantes.some(
        (participante) => participante.email === email
    );

    if (yaRegistrado) {
        throw new ApiError(400, 'El email ya se encuentra registrado en este evento');
    }

    evento.participantes.push({ nombre, email });
    evento.entradasDisponibles -= 1;

    await evento.save();
    return evento;
};

const obtenerEventosDisponibles = async () => {
    return await Evento.find({ entradasDisponibles: { $gt: 0 } }).sort('-createdAt');
};

const buscarEventosPorFecha = async (fecha) => {
    const inicioDia = new Date(`${fecha}T00:00:00.000Z`);
    const finDia = new Date(`${fecha}T23:59:59.999Z`);

    return await Evento.find({
        fecha: { $gte: inicioDia, $lte: finDia }
    }).sort('fecha');
};

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
