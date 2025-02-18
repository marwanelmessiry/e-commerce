const { validationResult } = require('express-validator');

const validatorMiddleware = (req, res, next) => {
    // Get validation result
    const errors = validationResult(req);

    // If there are validation errors, return them
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'fail',
            errors: errors.array(),
        });
    }

    // If no validation errors, proceed to the next middleware
    next();
};

module.exports = validatorMiddleware;
