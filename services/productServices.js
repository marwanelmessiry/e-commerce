const productModel = require('../models/productModel')
const ApiError = require('../utils/ApiError')
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
// @desc get product
// @route GET /api/v1/products
//@access public
exports.getproducts = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 5
    const skip = (page - 1) * limit
    const products = await productModel.find({}).skip(skip).limit(limit)
    res.status(200).json({ results: products.length, data: products })

})
// @desc create product
// @route POST /api/v1/products
//@access private
exports.createproduct = asyncHandler(async (req, res) => {
    req.body.slug = slugify(req.body.title)
    const product = await productModel.create(req.body);
    res.status(201).json({ data: product })
})
// @desc get specific product with id
// @route GET /api/v1/products/:id
//@access public
exports.getOneproduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const product = await productModel.findById(id)
    if (!product) {
        return next(new ApiError(`No product found for this ID ${id}`, 404))
    }
    res.status(200).json({ data: product })
})
// @desc update specific product
// @route PUT /api/v1/products
//@access private
exports.updateproduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    req.body.slug = slugify(req.body.title)
    const product = await productModel.findOneAndUpdate({ _id: id }, { new: true })
    if (!product) {
        return next(new ApiError(`No product found for this ID ${id}`, 404))

    }
    res.status(200).json({ data: product })
})
// @desc delete specific product
// @route DELETE /api/v1/products
//@access private
exports.deleteproduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    const product = await productModel.findByIdAndDelete(id)
    if (!product) {
        return next(new ApiError(`No product found for this ID ${id}`, 404))

    }
    res.status(204).send()
})