const brandModel = require('../models/brandModel')
const ApiError = require('../utils/ApiError')
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
// @desc get brand
// @route GET /api/v1/brands
//@access public
exports.getbrands = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 5
    const skip = (page - 1) * limit
    const brands = await brandModel.find({}).skip(skip).limit(limit)
    res.status(200).json({ results: brands.length, data: brands })

})
// @desc create brand
// @route POST /api/v1/brands
//@access private
exports.createbrand = asyncHandler(async (req, res) => {
    const name = req.body.name;

    const brand = await brandModel.create({ name, slug: slugify(name) });
    res.status(201).json({ data: brand })
})
// @desc get specific brand with id
// @route GET /api/v1/brands/:id
//@access public
exports.getOnebrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const brand = await brandModel.findById(id)
    if (!brand) {
        return next(new ApiError(`No brand found for this ID ${id}`, 404))
    }
    res.status(200).json({ data: brand })
})
// @desc update specific brand
// @route PUT /api/v1/brands
//@access private
exports.updatebrand = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const brand = await brandModel.findOneAndUpdate({ _id: id }, { name, slug: slugify(name) }, { new: true })
    if (!brand) {
        return next(new ApiError(`No brand found for this ID ${id}`, 404))

    }
    res.status(200).json({ data: brand })
})
// @desc delete specific brand
// @route DELETE /api/v1/brands
//@access private
exports.deletebrand = asyncHandler(async (req, res) => {
    const { id } = req.params
    const brand = await brandModel.findByIdAndDelete(id)
    if (!brand) {
        return next(new ApiError(`No brand found for this ID ${id}`, 404))

    }
    res.status(204).send()
})