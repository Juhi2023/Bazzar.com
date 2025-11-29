const express = require("express");
const paymentControllers = require("../controllers/paymentControllers");
const {isAuthenticatedUser} = require("../middlewares/auth")
const validator = require("../utils/validator")
const router = express.Router();

router.route('/payment/process').post(isAuthenticatedUser, validator.paymentProcess, paymentControllers.processPayment)
// router.route('/stripeapikey').get(isAuthenticatedUser, paymentControllers.sendStripeApiKey)


module.exports = router;