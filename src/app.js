const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const eventosRoutes = require('./routes/eventos.routes');
const errorHandler = require('./middlewares/errorHandler');
const ApiError = require('./utils/ApiError');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API de Gestor de Eventos funcionando correctamente'
    });
});

app.use('/eventos', eventosRoutes);

app.use((req, res, next) => {
    next(new ApiError(404, `La ruta ${req.originalUrl} no existe`));
});

app.use(errorHandler);

module.exports = app;
