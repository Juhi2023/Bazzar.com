const Errorhandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const universalFun  = require("../utils/universalFunctions")
const responseMessage = require('../utils/responseMessages')

exports.processPayment = catchAsyncErrors(async (req, res, next)=>{
    const payment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'inr',
        metadata: {
            company: 'Bazzar.com'
        }
    })

    return universalFun.sendSuccess(
        responseMessage.SUCCESS.PROCESS_PAYMEMNT,
        { success: true, client_secret: payment.client_secret },
        res
    )  
})

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
    return universalFun.sendSuccess(
        responseMessage.SUCCESS.GET_STRIPE_SECRET_KEY,
        { stripeApiKey: process.env.STRIPE_API_KEY },
        res
    ) 
  });