const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },

    descripcion: {
        type: String
    },

    fecha: {
        type: Date,
        required: true
    },

    lugar: {
        type: String
    },

    participantes: [{
        nombre: String,
        email: String
    }],

    capacidadMaxima: {
        type: Number
    },

    entradasDisponibles: {
        type: Number
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Evento', eventoSchema);
