const express = require("express");
const cartControllers = require("../controllers/cartControllers");
const {isAuthenticatedUser} = require("../middlewares/auth")
const validator = require("../utils/validator")
const router = express.Router();

router.route('/cart').get(isAuthenticatedUser, cartControllers.getCartItems)
    .put(isAuthenticatedUser, validator.addCartItem, cartControllers.addCartItems)
    .delete(isAuthenticatedUser, validator.deleteCartItem, cartControllers.deleteCartItems)

module.exports = router;