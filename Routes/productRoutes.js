const express = require('express');
const { param, validationResult } = require('express-validator')
const { getproducts,
    createproduct,
    getOneproduct,
    updateproduct,
    deleteproduct,
}
    = require("../services/productServices");
const { getProductValidator,
    createProductValidator,
    updateProductValidator,
    deleteProductValidator,
} = require('../utils/validators/productValidator');
const router = express.Router();
router.route('/').get(getproducts).post(createProductValidator, createproduct);
router.route('/:id').get(getProductValidator, getOneproduct).put(updateProductValidator, updateproduct).delete(deleteProductValidator, deleteproduct);
module.exports = router