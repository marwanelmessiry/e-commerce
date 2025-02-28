const express = require('express');
const { param, validationResult } = require('express-validator')
const { getbrands,
    createbrand,
    updatebrand,
    getOnebrand,
    deletebrand }
    = require("../services/brandServices");
const { getbrandValidator,
    createbrandValidator,
    updatebrandValidator,
    deletebrandValidator
} = require('../utils/validators/brandValidator');
const router = express.Router();
router.route('/').get(getbrands).post(createbrandValidator, createbrand);
router.route('/:id').get(getbrandValidator, getOnebrand).put(updatebrandValidator, updatebrand).delete(deletebrandValidator, deletebrand);
module.exports = router