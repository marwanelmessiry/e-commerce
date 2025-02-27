const SubcatModel = require('../models/subCatModel');
const ApiError = require('../utils/ApiError');
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
// @desc get Subcategory
// @route GET /api/v1/Subcategories
//@access public
exports.getSubCategories = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 5
    const skip = (page - 1) * limit
    const SubCats = await SubcatModel.find({}).skip(skip).limit(limit).populate({ path: 'Cat', select: 'name -_id' })
    res.status(200).json({ results: SubCats.length, data: SubCats })

})
// @desc get specific SubCategory with id
// @route GET /api/v1/Subcategories/:id
//@access public
exports.getOneSubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const SubCategory = await SubcatModel.findById(id).populate({ path: 'Cat', select: 'name -_id' })
    if (!SubCategory) {
        return next(new ApiError(`No Subcategory found for this ID ${id}`, 404))
    }
    res.status(200).json({ data: SubCategory })
})
// @desc create Subcategory
// @route POST /api/v1/Subcategories
// @access private
exports.createSubCategory = asyncHandler(async (req, res) => {
    const { name, Cat } = req.body; // Ensure 'Cat' matches your schema

    const newSubcat = await SubcatModel.create({ name, slug: slugify(name), Cat });

    res.status(201).json({ data: newSubcat });
});
// @desc update specific Subcategory
// @route PUT /api/v1/categories
//@access private
exports.updateSubCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { name, Cat } = req.body
    const SubCategory = await SubcatModel.findOneAndUpdate({ _id: id }, { name, slug: slugify(name), Cat }, { new: true })
    if (!SubCategory) {
        return next(new ApiError(`No Sub category found for this ID ${id}`, 404))

    }
    res.status(200).json({ data: SubCategory })
})
// @desc delete specific Subcategory
// @route DELETE /api/v1/Subcategories
//@access private
exports.deleteSubCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    const SubCategory = await SubcatModel.findByIdAndDelete(id)
    if (!SubCategory) {
        return next(new ApiError(`No category found for this ID ${id}`, 404))

    }
    res.status(204).send()
})