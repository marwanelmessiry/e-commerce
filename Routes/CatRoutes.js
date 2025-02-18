const express = require('express');
const { param, validationResult } = require('express-validator')
const { getCategories, createCategory, updatecategory, getOneCategory, deleteCategory } = require("../services/catServices");
const router = express.Router();

router.route('/').get(getCategories).post(createCategory);
router.route('/:id').get(param('id').isMongoId().withMessage('Invalid category id'), (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return res.status(400).send(`Error in ID as it is  ${req.param.id}!`);
    }

    res.status(400).send({ errors: result.array() });
}, getOneCategory).put(updatecategory).delete(deleteCategory);
module.exports = router