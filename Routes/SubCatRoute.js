const express = require('express');
const { createSubCategory, getOneSubCategory, getSubCategories, updateSubCategory, deleteSubCategory } = require('../services/SubCatService');
const router = express.Router();
const { createSubCategoryValidator, getSubCategoryValidator, updateSubCategoryValidator, deleteSubCategoryValidator } = require('../utils/validators/SubCatValidator');
router.route("/").post(createSubCategoryValidator, createSubCategory).get(getSubCategories);
router.route("/:id").get(getSubCategoryValidator, getOneSubCategory).put(updateSubCategoryValidator, updateSubCategory).delete(deleteSubCategoryValidator, deleteSubCategory);
module.exports = router;