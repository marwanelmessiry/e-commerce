const express = require('express');
const { createSubCategory } = require('../services/SubCatService');
const router = express.Router();
const { createSubCategoryValidator } = require('../utils/validators/SubCatValidator');
router.route("/").post(createSubCategoryValidator, createSubCategory);
module.exports = router;