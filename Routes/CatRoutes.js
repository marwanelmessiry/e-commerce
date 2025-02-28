const express = require('express');
const { param, validationResult } = require('express-validator')
const { getCategories,
    createCategory,
    updatecategory,
    getOneCategory,
    deleteCategory }
    = require("../services/catServices");
const { getCategoryValidator,
    createCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator
} = require('../utils/validators/catValidator');
const SubCategoryRouter = require('./SubCatRoute');
const router = express.Router();
router.use('/:categoryId/subcategories', SubCategoryRouter)
router.route('/').get(getCategories).post(createCategoryValidator, createCategory);
router.route('/:id').get(getCategoryValidator, getOneCategory).put(updateCategoryValidator, updatecategory).delete(deleteCategoryValidator, deleteCategory);
module.exports = router