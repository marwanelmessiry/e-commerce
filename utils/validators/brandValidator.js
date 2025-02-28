const { check } = require('express-validator')
const validatorMiddleware = require('../../MiddleWares/validatorMiddleware')
exports.getbrandValidator = [
    check('id').isMongoId().withMessage('Invalid brand id'),
    validatorMiddleware
]
exports.createbrandValidator = [
    check('name').notEmpty().withMessage('brand required')
        .isLength({ min: 3 }).withMessage('brand is too short')
        .isLength({ max: 32 }).withMessage('brand is too long'),
    validatorMiddleware
]
exports.updatebrandValidator = [
    check('id').isMongoId().withMessage('Invalid brand id'),
    validatorMiddleware
]
exports.deletebrandValidator = [
    check('id').isMongoId().withMessage('Invalid brand id'),
    validatorMiddleware
]