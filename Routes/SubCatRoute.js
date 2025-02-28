const express = require('express');
const { createSubCategory
    , getOneSubCategory
    , getSubCategories
    , updateSubCategory
    , deleteSubCategory
    , setCatIdToBody
    , createfilterObject

} = require('../services/SubCatService');
// mergeParams: true is used to merge the params from the parent router and to access parameters from the parent router
const router = express.Router({ mergeParams: true });
const { createSubCategoryValidator, getSubCategoryValidator, updateSubCategoryValidator, deleteSubCategoryValidator } = require('../utils/validators/SubCatValidator');
router.route("/").post(setCatIdToBody, createSubCategoryValidator, createSubCategory).get(createfilterObject, getSubCategories);
router.route("/:id").get(getSubCategoryValidator, getOneSubCategory).put(updateSubCategoryValidator, updateSubCategory).delete(deleteSubCategoryValidator, deleteSubCategory);
module.exports = router;
