const { check } = require('express-validator')
const validatorMiddleware = require('../../MiddleWares/validatorMiddleware')
exports.getCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id'),
    validatorMiddleware
]
exports.createCategoryValidator = [
    check('name').notEmpty().withMessage('Category required')
        .isLength({ min: 3 }).withMessage('Category is too short')
        .isLength({ max: 32 }).withMessage('Category is too long'),
    validatorMiddleware
]
exports.updateCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id'),
    validatorMiddleware
]
exports.deleteCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id'),
    validatorMiddleware
]