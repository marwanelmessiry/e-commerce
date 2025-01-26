const express = require('express');
const { getCategories, createCategory, updatecategory, getOneCategory, deleteCategory } = require("../services/catServices");
const router = express.Router();

router.route('/').get(getCategories).post(createCategory);
router.route('/:id').get(getOneCategory).put(updatecategory).delete(deleteCategory);
module.exports = router