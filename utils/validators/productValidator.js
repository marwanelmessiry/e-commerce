const { check } = require('express-validator');
const validatorMiddleware = require('../../MiddleWares/validatorMiddleware');
const catModel = require('../../models/catModel');
const subCatModel = require('../../models/subCatModel');
exports.createProductValidator = [
    check('title')
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3 }).withMessage('Title must be at least 3 characters')
        .isLength({ max: 2000 }).withMessage('Title must be at most 2000 characters'),

    check('description')
        .notEmpty().withMessage('Description is required')
        .isLength({ min: 20 }).withMessage('Description must be at least 20 characters')
        .isLength({ max: 1000 }).withMessage('Description must be at most 1000 characters'),

    check('quantity')
        .notEmpty().withMessage('Quantity is required')
        .isNumeric().withMessage('Quantity must be a number'),

    check('sold')
        .optional()
        .isNumeric().withMessage('Sold must be a number'),

    check('price')
        .notEmpty().withMessage('Price is required')
        .isNumeric().withMessage('Price must be a number'),

    check('priceDiscount')
        .optional()
        .isNumeric().toFloat().withMessage('Price Discount must be a number')
        .custom((value, { req }) => {
            if (value >= req.body.price) {
                throw new Error('Discount price must be less than the regular price');
            }
            return true;
        }),

    check('color')
        .optional()
        .isArray().withMessage('Color must be an array'),

    check('imagesCov')
        .notEmpty().withMessage('Cover image is required'),

    check('images')
        .optional()
        .isArray().withMessage('Images must be an array'),

    check('Category')
        .notEmpty().withMessage('Category is required')
        .isMongoId().withMessage('Invalid Category ID')
        .custom(async (categoryId) => {
            const category = await catModel.findById(categoryId);
            if (!category) {
                throw new Error('Category not found');
            }
        }),


    check('SubCategories')
        .optional()
        .isArray().withMessage('SubCategories must be an array')
        .custom(async (subCatIds) => {


            // Validate that all SubCategory IDs exist
            const subCategories = await subCatModel.find({ _id: { $in: subCatIds } });
            if (subCategories.length !== subCatIds.length) {
                throw new Error('One or more SubCategory IDs do not exist');
            }
        })
        .custom((val, { req }) => {
            return subCatModel.find({ Cat: req.body.Category }).then((subcats) => {
                const SubCatsInDb = subcats.map(subcat => subcat._id.toString());

                if (!val.every(v => SubCatsInDb.includes(v))) {
                    return Promise.reject(new Error('One or more SubCategory IDs do not belong to the selected Category'));
                }
            });
        }),


    check('brand')
        .optional()
        .isMongoId().withMessage('Invalid brand id'),

    check('ratingsAverage')
        .optional()
        .isNumeric().withMessage('Rating must be a number')
        .isFloat({ min: 1 }).withMessage('Rating must be above 1.0'), // Changed to isFloat for numeric validation

    check('ratingsQuantity')
        .optional()
        .isNumeric().withMessage('Rating quantity must be a number'),

    validatorMiddleware,
];

exports.getProductValidator = [
    check('id').isMongoId().withMessage('Invalid product id'),
    validatorMiddleware,
];

exports.updateProductValidator = [
    check('id').isMongoId().withMessage('Invalid product id'),
    validatorMiddleware,
];

exports.deleteProductValidator = [
    check('id').isMongoId().withMessage('Invalid product id'),
    validatorMiddleware,
];
