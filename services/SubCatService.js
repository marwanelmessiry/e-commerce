const SubcatModel = require('../models/subCatModel');
const ApiError = require('../utils/ApiError');
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');

// @desc create Subcategory
// @route POST /api/v1/Subcategories
// @access private
exports.createSubCategory = asyncHandler(async (req, res) => {
    const { name, Cat } = req.body; // Ensure 'Cat' matches your schema

    const newSubcat = await SubcatModel.create({ name, slug: slugify(name), Cat });

    res.status(201).json({ data: newSubcat });
});
