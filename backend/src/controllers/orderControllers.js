const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Errorhandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const universalFun  = require("../utils/universalFunctions")
const responseMessage = require('../utils/responseMessages')

//create order
exports.newOrder = catchAsyncErrors(async(req, res, next)=>{
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      orderStatus: paymentInfo.status === "succeeded" ? "Order placed" : "Failed",
      paidAt: Date.now(),
      user: req.user._id,
    });

    for (const item of orderItems) {
      await updateStock(item.product, item.quantity);
    }

    await Cart.updateOne(
      { user: req.user._id },
      { $set: { cartItems: [] } }
    );

    return universalFun.sendSuccess(
      responseMessage.SUCCESS.ORDER_CREATED,
      order,
      res
    )
})

// get single Order
exports.getSingleOrder = catchAsyncErrors(async(req, res, next)=>{
  const orders = await Order.findById(req.params.id).populate("user", " name email").populate("orderItems.product", "description slug").populate({
    path: "orderItems.product",
    populate: {
      path: "category",          
      select: "name slug"  
    }
  })
  if(!orders){
    return next( new Errorhandler(responseMessage.ERROR.ORDER_NOT_FOUND.customMessage, responseMessage.ERROR.ORDER_NOT_FOUND.statusCode))
  }
  return universalFun.sendSuccess(
    responseMessage.SUCCESS.SINGLE_ORDER_FETCHED,
    orders,
    res
  )
})

// get logged in user  Orders
exports.myOrders = catchAsyncErrors(async(req, res, next)=>{
  const orders = await Order.find({user: req.user._id}).sort({ "createdAt": -1 })

  return universalFun.sendSuccess(
    responseMessage.SUCCESS.ALL_ORDER_FETCHED,
    orders,
    res
  )
})

// get all Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  return universalFun.sendSuccess(
    responseMessage.SUCCESS.ALL_ORDER_FETCHED,
    {
      orders,
      totalAmount
    },
    res
  )
});

// update Order status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next( new Errorhandler(responseMessage.ERROR.ORDER_NOT_FOUND.customMessage, responseMessage.ERROR.ORDER_NOT_FOUND.statusCode))
  }

  if (order.orderStatus === "Delivered") {
    return next(new Errorhandler("You have already delivered this order", 400));
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  return universalFun.sendSuccess(
    responseMessage.SUCCESS.ORDER_UPDATED,
    {},
    res
  )
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next( new Errorhandler(responseMessage.ERROR.ORDER_NOT_FOUND.customMessage, responseMessage.ERROR.ORDER_NOT_FOUND.statusCode))
  }

  await Order.deleteOne({_id: req.params.id})

  return universalFun.sendSuccess(
    responseMessage.SUCCESS.ORDER_DELETED,
    {},
    res
  )
});

// cancel Order -- User/Admin
exports.cancelOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(
      new Errorhandler(
        responseMessage.ERROR.ORDER_NOT_FOUND.customMessage,
        responseMessage.ERROR.ORDER_NOT_FOUND.statusCode
      )
    );
  }

  // only allow cancel if not delivered
  if (order.orderStatus === "Delivered") {
    return next(
      new Errorhandler("You cannot cancel an order that has already been delivered", 400)
    );
  }

  // restore stock since we already deducted during order placement
  for (const item of order.orderItems) {
    await restoreStock(item.product, item.quantity);
  }

  order.orderStatus = "Cancelled";
  order.cancelledAt = Date.now();

  await order.save({ validateBeforeSave: false });

  return universalFun.sendSuccess(
    responseMessage.SUCCESS.ORDER_CANCELLED || "Order cancelled successfully",
    order,
    res
  );
});

async function restoreStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock += quantity;

  await product.save({ validateBeforeSave: false });
}
