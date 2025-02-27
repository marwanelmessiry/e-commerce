const { check } = require('express-validator')
const validatorMiddleware = require('../../MiddleWares/validatorMiddleware')
exports.getSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid SubCategory id'),
    validatorMiddleware
]
exports.createSubCategoryValidator = [
    check('name').notEmpty().withMessage('SubCategory required')
        .isLength({ min: 2 }).withMessage('SubCategory is too short')
        .isLength({ max: 32 }).withMessage('SubCategory is too long'),
    check('Cat').notEmpty().withMessage('Category required')
        .isMongoId().withMessage('Invalid Category id format'),
    validatorMiddleware
]
exports.updateSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid SubCategory id'),
    validatorMiddleware
]
exports.deleteSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid SubCategory id'),
    validatorMiddleware
]