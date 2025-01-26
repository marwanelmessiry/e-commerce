const catModel = require('../models/catModel')
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
// @desc get category
// @route GET /api/v1/categories
//@access public
exports.getCategories = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 5
    const skip = (page - 1) * limit
    const cats = await catModel.find({}).skip(skip).limit(limit)
    res.status(200).json({ results: cats.length, data: cats })

})
// @desc create category
// @route POST /api/v1/categories
//@access private
exports.createCategory = asyncHandler(async (req, res) => {
    const name = req.body.name;

    const category = await catModel.create({ name, slug: slugify(name) });
    res.status(201).json({ data: category })
})
// @desc get specific category with id
// @route GET /api/v1/categories/:id
//@access public
exports.getOneCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    const category = await catModel.findById(id)
    if (!category) {
        res.status(404).json({ msg: `catrgory not found for this id ${id}` })
    }
    res.status(200).json({ data: category })
})
// @desc update specific category
// @route PUT /api/v1/categories
//@access private
exports.updatecategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const category = await catModel.findOneAndUpdate({ _id: id }, { name, slug: slugify(name) }, { new: true })
    if (!category) {
        res.status(404).json({ msg: `catrgory not found for this id ${id}` })
    }
    res.status(200).json({ data: category })
})
// @desc delete specific category
// @route DELETE /api/v1/categories
//@access private
exports.deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    const category = await catModel.findByIdAndDelete(id)
    if (!category) {
        res.status(404).json({ msg: `catrgory not found for this id ${id}` })
    }
    res.status(204).send()
})