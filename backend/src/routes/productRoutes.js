const express = require("express");
const productControllers = require("../controllers/productControllers");
const {isAuthenticatedUser, authorizeRoles} = require("../middlewares/auth")
const validator = require("../utils/validator")
const router = express.Router();

router.route('/products').get( productControllers.getAllProducts)

router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"),  validator.createProduct,  productControllers.createProduct)

router.route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), validator.updateProduct, productControllers.updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), validator.deleteProduct, productControllers.deleteProduct)

router.route("/product/:id").get(validator.getProductDetails, productControllers.getProductDetails)

router.route("/review").post(isAuthenticatedUser, validator.createProductReview, productControllers.createProductReview)

router.route("/review")
  // .get(validator.getProductReviews, productControllers.getProductReviews)
  .delete(isAuthenticatedUser, validator.deleteReview, productControllers.deleteReview);
  
module.exports = router;