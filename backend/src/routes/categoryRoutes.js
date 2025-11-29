const express = require("express");
const categoryControllers = require("../controllers/categoryControllers");
const {isAuthenticatedUser, authorizeRoles} = require("../middlewares/auth")
const validator = require("../utils/validator")
const router = express.Router();

router.route('/categories').get(categoryControllers.getAllCategories)

router.route('/admin/category/new').post(isAuthenticatedUser, authorizeRoles("admin"), validator.createCategory, categoryControllers.createCategory)

router.route("/admin/category/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), validator.updateCategory, categoryControllers.updateCategory)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), validator.deleteCategory, categoryControllers.deleteCategory)

  
module.exports = router;