const { check } = require('express-validator')
const validatorMiddleware = require('../../MiddleWares/validatorMiddleware')
exports.getCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id'),
    validatorMiddleware
]