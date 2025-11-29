const Cart = require("../models/cartModel");
const Errorhandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const universalFun  = require("../utils/universalFunctions")
const responseMessage = require('../utils/responseMessages');

exports.getCartItems = catchAsyncErrors(async (req, res, next) => {
    const cartItems = await Cart.findOne({user: req.user._id}).populate({
      path: 'cartItems.product' ,
      populate : {
        path : 'category'
      },
      select: ' -reviews'
    });

    return universalFun.sendSuccess(
      responseMessage.SUCCESS.CART_ITEMS_FETCH,
      {
        cartItems
      },
      res
    )
  });

exports.addCartItems = catchAsyncErrors(async (req, res, next) => {
    const {productId, quantity} = req.body;
    const cart = await Cart.findOne({user: req.user._id})

    if(cart){
        const cart = await Cart.findOne({user: req.user._id, 'cartItems.product': productId})
        if(cart)
            await Cart.updateOne({user: req.user._id, 'cartItems.product': productId}, { $set: { 'cartItems.$.quantity': quantity} });
        else
            await Cart.updateOne({user: req.user._id}, { $push: { cartItems: {product: productId, quantity} } });

    }
    else{
        const newCart = new Cart({
          user: req.user._id,
          cartItems: {
              product: productId,
              quantity
          },
        });
        await newCart.save()
    }

    return universalFun.sendSuccess(
      responseMessage.SUCCESS.CART_ITEMS_ADDED,
      {},
      res
    )
  });

 exports.deleteCartItems = catchAsyncErrors(async (req, res, next) => {
    const {productId} = req.body;

    await Cart.updateOne({user: req.user._id}, { $pull: { cartItems: {product: productId} } });

    return universalFun.sendSuccess(
      responseMessage.SUCCESS.CART_ITEM_DELETE,
      {},
      res
    )
  });