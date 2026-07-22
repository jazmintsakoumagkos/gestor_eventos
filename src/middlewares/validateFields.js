const { validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

const validateFields = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const primerError = errors.array()[0].msg;
        return next(new ApiError(400, primerError));
    }

    return next();
};

module.exports = validateFields;
