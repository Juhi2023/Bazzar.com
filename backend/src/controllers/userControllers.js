const saltedMd5=require('salted-md5')
const jwt = require('jsonwebtoken')
const crypto = require("node:crypto");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Errorhandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { generateToken } = require("../utils/generateTokens");
const {sendMail} = require("../utils/snsAndSesService");
const constant = require("../utils/constant");
const universalFun  = require("../utils/universalFunctions")
const responseMessage = require('../utils/responseMessages')
const path=require('path');
const {getDownloadURL} = require('firebase-admin/storage');


exports.registerUser = catchAsyncErrors(async(req, res, next)=>{    
    let {first_name, last_name, email, password, phone, role} = req.body;

    const userByPhone = await User.findOne({phone});
    if(userByPhone && userByPhone.phoneVerified !==false){
      return next(new Errorhandler(responseMessage.ERROR.MOBILE_NUMBER_ALREADY_EXISTS.customMessage, responseMessage.ERROR.MOBILE_NUMBER_ALREADY_EXISTS.statusCode))
    }

    const userByEmail = await User.findOne({email});
    if(userByEmail && userByEmail.email === email && userByEmail.phoneVerified === true){
      return next(new Errorhandler(responseMessage.ERROR.EMAIL_ALREADY_EXISTS.customMessage, responseMessage.ERROR.EMAIL_ALREADY_EXISTS.statusCode))
    }

    await User.deleteOne({phone})
    await User.deleteOne({email})
    const newUser = new User({
      first_name,
      last_name,
      email,
      password,
      phone,
      role,
      profile_pic: {path:'', url: ''},
      mobileOTP: '123456'
    });
    await newUser.save()

    return universalFun.sendSuccess(
      responseMessage.SUCCESS.OTP_SENT_SUCCESSFULLY,
      {},
      res
    )  
})

//---------------------------------- check
exports.verifyOTP = catchAsyncErrors(async(req, res, next)=>{
    
  let {phone, otp} = req.body;

  const userByPhone = await User.findOne({phone});
  if(!userByPhone){
    return next(new Errorhandler(responseMessage.ERROR.USER_DATA_DOES_NOT_EXISTS_IN_DB.customMessage, responseMessage.ERROR.USER_DATA_DOES_NOT_EXISTS_IN_DB.statusCode))
  }

  const tokens = await generateToken(userByPhone._id, res)
  const tokenObj = {
    accessToken: tokens.access,
    refreshToken: tokens.refresh
  }

  //create  on mobile number
  if(userByPhone.mobileOTP === otp){
    userByPhone.phoneVerified = true
    userByPhone.mobileOTP = ''
    userByPhone.tokens = [...userByPhone.tokens, tokenObj];
    await userByPhone.save()

    let params = {
      user_name: userByPhone.name,
      email_id: userByPhone.email,
      emailType: constant.emailType.WELCOME_EMAIL,
      emailSubject: constant.emailSubject.WELCOME_EMAIL
    }

    await sendMail(params)

  }else{
    return next(new Errorhandler(responseMessage.ERROR.INVALID_OTP.customMessage, responseMessage.ERROR.INVALID_OTP.statusCode))
  }

  return universalFun.sendSuccess(
    responseMessage.SUCCESS.REGISTER,
    {
      id: userByPhone._id,
      name: userByPhone.name,
      email: userByPhone.email,
      avatar: userByPhone.avatar,
      role: userByPhone.role,
      profile_pic: userByPhone.profile_pic,
      accessToken: tokens.access,
      refreshToken: tokens.refresh
    },
    res
  )  
})

exports.resendOTP = catchAsyncErrors(async(req, res, next)=>{
    
  let {phone} = req.body;

  const userByPhone = await User.findOne({phone});
  if(!userByPhone){
    return next(new Errorhandler(responseMessage.ERROR.USER_DATA_DOES_NOT_EXISTS_IN_DB.customMessage, responseMessage.ERROR.USER_DATA_DOES_NOT_EXISTS_IN_DB.statusCode))
  }

  userByPhone.mobileOTP = '654321'
  await userByPhone.save()


  return universalFun.sendSuccess(
    responseMessage.SUCCESS.OTP_SENT_SUCCESSFULLY,
    {},
    res
  )  
})
//------------------------------------


exports.loginUser = catchAsyncErrors(async(req, res, next)=>{
  const {email, password} = req.body;
  if (!email || !password) {
    return next(new Errorhandler(responseMessage.ERROR.ENTER_EMAIL_PASSWORD.customMessage, responseMessage.ERROR.ENTER_EMAIL_PASSWORD.statusCode))
  }

  const user = await User.findOne({ email }).select("+password")
  if (!user) {
    return next(new Errorhandler(responseMessage.ERROR.NO_USER_FOUND.customMessage, responseMessage.ERROR.NO_USER_FOUND.statusCode))
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new Errorhandler(responseMessage.ERROR.INVALID_EMAIL_OR_PASSWORD.customMessage, responseMessage.ERROR.INVALID_EMAIL_OR_PASSWORD.statusCode))
  }

  if (!user.phoneVerified) {
    return next(new Errorhandler(responseMessage.ERROR.NO_USER_FOUND.customMessage, responseMessage.ERROR.NO_USER_FOUND.statusCode))
  }

  const tokens = await generateToken(user._id, res)
  await User.updateOne({_id: user._id}, {$push: {tokens: {refreshToken: tokens.refresh, accessToken: tokens.access}}})

  const cart = await Cart.findOne({user: user._id})
  const cartItemsCount = cart?.cartItems?.length

  const data={
    authenticated: true,
    first_name: user?.first_name,
    last_name: user?.last_name,
    cartItemsCount,
    role: user?.role
  }

  return universalFun.sendSuccess(
    responseMessage.SUCCESS.LOGIN,
    data,
    res
  )   
});

exports.authStatus = catchAsyncErrors(async (req, res, next) => {
  const { accessToken } = req.cookies;

    if (!accessToken) {
      return next(new Errorhandler(responseMessage.ERROR.UNAUTHORIZED.customMessage, responseMessage.ERROR.UNAUTHORIZED.statusCode))
    }

    jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET, async(err, decodedData)=>{
      if(err){
        await User.findOneAndUpdate({'tokens.accessToken':  accessToken}, {
          $pull: {
            tokens: {
              accessToken
            }
          }
        })
        return next(new Errorhandler(responseMessage.ERROR.TOKEN_INVALID.customMessage, responseMessage.ERROR.TOKEN_INVALID.statusCode))  
      }else{
        const user = await User.findById(decodedData.id)
        const cart = await Cart.findOne({user: decodedData.id})
        const cartItemsCount = cart?.cartItems?.length
      
        const data={
          authenticated: true,
          first_name: user?.first_name,
          last_name: user?.last_name,
          cartItemsCount,
          role: user?.role
        }
        return universalFun.sendSuccess(
          responseMessage.SUCCESS.LOGIN,
          data,
          res
        )  
      }
    }) 
})

exports.logout = catchAsyncErrors(async (req, res, next) => {
  const cookies = req.cookies;

  if (cookies?.refreshToken){
    const refreshToken = cookies.refreshToken;
    const decodedData = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET)
    const update = {
      $pull: {
        tokens: {
          refreshToken: refreshToken
        }
      }
    };
    
    await User.updateOne({ _id: decodedData.id }, update);
  }
  res.clearCookie('accessToken', { httpOnly: true, secure: true, sameSite: 'none'});
  res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'none'});

  return universalFun.sendSuccess(
    responseMessage.SUCCESS.USER_LOGOUT,
    {},
    res
  )   
})


//---------------------------------- check
exports.forgotPassword = catchAsyncErrors(async(req, res, next)=>{
  const user = await User.findOne({email: req.body.email});
  
  if(!user){
    return next(new Errorhandler(responseMessage.ERROR.NO_USER_FOUND.customMessage, responseMessage.ERROR.NO_USER_FOUND.statusCode))
  }

  //get ResetPassword Token
  const resetToken = await user.getResetpasswordToken();
  await user.save({validateBeforeSave: false});

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`
  console.log(resetPasswordUrl)
  try {

    let params = {
      user_name: user.name,
      email_id: req.body.email,
      reset_link: resetPasswordUrl,
      emailType: constant.emailType.FORGOT_PASSWORD_EMAIL,
      emailSubject: constant.emailSubject.FORGOT_PASSWORD_EMAIL
    }

    await sendMail(params)

    return universalFun.sendSuccess(
      responseMessage.SUCCESS.EMAIL_SENT,
      {},
      res
    )   
        
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({validateBeforeSave: false});

    return next(new Errorhandler(responseMessage.ERROR.DEFAULT.customMessage, responseMessage.ERROR.DEFAULT.statusCode))
  }
})

exports.resetPassword = catchAsyncErrors(async(req, res, next)=>{
  const hashToken = crypto.createHash("sha256").update( req.params.resetToken).digest("hex")
  const user = await User.findOne({resetPasswordToken: hashToken, resetPasswordExpire: {$gt: Date.now()}})

  if(!user){
    return next(new Errorhandler(responseMessage.ERROR.TOKEN_INVALID.customMessage, responseMessage.ERROR.TOKEN_INVALID.statusCode))
  }

  if(req.body.password !== req.body.confirmPassword){
    return next(new Errorhandler(responseMessage.ERROR.PASSWORD_NOT_MATCH.customMessage, responseMessage.ERROR.PASSWORD_NOT_MATCH.statusCode))
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save()

  return universalFun.sendSuccess(
    responseMessage.SUCCESS.PASSWORD_CHANGED,
    {},
    res
  )  
})

exports.validateResetPasswordToken = catchAsyncErrors(async(req, res, next)=>{
  const hashToken = crypto.createHash("sha256").update( req.params.resetToken).digest("hex")
  const user = await User.findOne({resetPasswordToken: hashToken, resetPasswordExpire: {$gt: Date.now()}})

  if(!user){
    return universalFun.sendSuccess(
      responseMessage.SUCCESS.RESET_PASSWORD_LINK_EXPIRED,
      {valid: false},
      res
    )  
  }

  return universalFun.sendSuccess(
    responseMessage.SUCCESS.VAILD_TOKEN,
    {valid: true},
    res
  )  
})
//------------------------------------


exports.getUserDetails = catchAsyncErrors(async(req, res, next)=>{
  return universalFun.sendSuccess(
    responseMessage.SUCCESS.FETCH_USER_PROFILE,
    req.user,
    res
  )  
})

exports.getUserAddress = catchAsyncErrors(async(req, res, next)=>{
  return universalFun.sendSuccess(
    responseMessage.SUCCESS.FETCH_USER_PROFILE,
    req.user.address,
    res
  )  
})

exports.updatePassword = catchAsyncErrors(async(req, res, next)=>{
  const user = await User.findById(req.user._id).select("+password");
  const isPasswordMatched  = await user.comparePassword(req.body.oldPassword)

  if(!isPasswordMatched){
    return next(new Errorhandler(responseMessage.ERROR.INCORRECT_OLD_PASSWORD.customMessage, responseMessage.ERROR.INCORRECT_OLD_PASSWORD.statusCode))
  }

  if(req.body.newPassword !== req.body.confirmPassword){
    return next(new Errorhandler(responseMessage.ERROR.PASSWORD_NOT_MATCH.customMessage, responseMessage.ERROR.PASSWORD_NOT_MATCH.statusCode))
  }
  user.password = req.body.newPassword;
  await user.save();

  const tokens = generateToken(user._id, res)
  delete user.password;
  user.accessToken = tokens.access;
  user.refreshToken = tokens.refresh;

  return universalFun.sendSuccess(
    responseMessage.SUCCESS.PASSWORD_CHANGED,
    {},
    res
  )
})

// update User Profile
exports.updateProfile = catchAsyncErrors(async(req, res, next)=>{
  const user = await User.findById(req.user._id, {first_name:1, last_name:1, profile_pic:1, phone:1, email:1, role:1, _id:1, address:1})

  if(req.body.phone && req.body.phone !== user.phone){
    const userByPhone = await User.findOne({phone: req.body.phone});
    if(userByPhone && userByPhone.phoneVerified !==false){
      return next(new Errorhandler(responseMessage.ERROR.MOBILE_NUMBER_ALREADY_EXISTS.customMessage, responseMessage.ERROR.MOBILE_NUMBER_ALREADY_EXISTS.statusCode))
    }
  }

  if(req.body.email && req.body.email !== user.email){
    const userByEmail = await User.findOne({email:req.body.email});
    if(userByEmail && userByEmail.email === req.body.email && userByEmail.phoneVerified === true){
      return next(new Errorhandler(responseMessage.ERROR.EMAIL_ALREADY_EXISTS.customMessage, responseMessage.ERROR.EMAIL_ALREADY_EXISTS.statusCode))
    }
  }

  user.first_name = req.body.first_name ? req.body.first_name : user.first_name;
  user.last_name = req.body.last_name ? req.body.last_name : user.last_name;
  user.email = req.body.email ? req.body.email: user.email;
  user.phone = req.body.phone ? req.body.phone : user.phone;


  let fileName, fileURL;
  if(req.file){
    const name = saltedMd5(req.file.originalname, 'SUPER-S@LT!')
    fileName ='users/' + name + '-' + Math.floor(Math.random() * 100) + path.extname(req.file.originalname) 
    const fileRef =  global.bucket.file(fileName)
    const stream = await fileRef.createWriteStream().end(req.file.buffer)
    

    await stream.on('finish', async()=>{
      fileURL = await getDownloadURL(fileRef);
      if(req.user.profile_pic.path){
        await global.bucket.file(req.user.profile_pic.path).delete()
      }
      
      user.profile_pic = {
        path: req.file ? fileName : user.profile_pic.path,
        url: req.file ? fileURL : user.profile_pic.url
      }
      await user.save()

      return universalFun.sendSuccess(
        responseMessage.SUCCESS.PROFILE_UPDATE,
        user,
        res
      ) 
    })
  }else{
    await user.save()
    return universalFun.sendSuccess(
      responseMessage.SUCCESS.PROFILE_UPDATE,
      user,
      res
    ) 
  }
})

// update User Address
exports.updateAddress = catchAsyncErrors(async(req, res, next)=>{
  const user = await User.findById(req.user._id)

  user.address = {
    country: req.body.country,
    city: req.body.city,
    state: req.body.state,
    address: req.body.address,
    locality: req.body.locality,
    pinCode: req.body.pinCode,
  }
  await user.save()

  return universalFun.sendSuccess(
    responseMessage.SUCCESS.ADDRESS_CHANGED,
    user.address,
    res
  ) 
})

//delete user account
exports.deleteAccount = catchAsyncErrors(async(req, res, next)=>{
  
  if(req.user.profile_pic.path){
    await global.bucket.file(req.user.profile_pic.path).delete()
  }
  //await User.deleteOne({_id: req.user._id})
  await Order.updateMany({user: req.user._id}, {"$set":{"deleteAt": Date.now()}});  
  await Cart.deleteMany({user: req.user._id});

  res.clearCookie('accessToken', { httpOnly: true, sameSite: 'none'});
  res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none'});

  return universalFun.sendSuccess(
    responseMessage.SUCCESS.USER_LOGOUT,
    {},
    res
  )
})

function formatDate(date, granularity = "daily") {
  const d = new Date(date);

  if (granularity === "monthly") {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  }

  if (granularity === "weekly") {
    const firstDayOfYear = new Date(d.getFullYear(), 0, 1);
    const pastDays = Math.floor((d - firstDayOfYear) / 86400000);
    const week = Math.ceil((pastDays + firstDayOfYear.getDay() + 1) / 7);
    return `${d.getFullYear()}-W${String(week).padStart(2, "0")}`;
  }

  // daily
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getRevenueTrend(orders, granularity = "daily") {
  const trend = {};

  for (const order of orders) {
    if (["Processing", "Shipped", "Delivered"].includes(order.orderStatus)) {
      const key = formatDate(order.createdAt, granularity);
      trend[key] = (trend[key] || 0) + order.totalPrice;
    }
  }

  // convert object → sorted array for chart
  return Object.keys(trend)
    .sort()
    .map(date => ({ date, revenue: trend[date] }));
}

function getRevenueByCategory(orders) {
  const categoryRevenue = {};
  
  for (const order of orders) {
    if (["Processing", "Shipped", "Delivered"].includes(order.orderStatus)) {
      for (const item of order.orderItems) {
        const category = item.product?.category.name || "Uncategorized";
        const itemRevenue = item.price * item.quantity;

        if (!categoryRevenue[category]) {
          categoryRevenue[category] = { revenue: 0, orders: 0 };
        }

        categoryRevenue[category].revenue += itemRevenue;
        categoryRevenue[category].orders += item.quantity;
      }
    }
  }

  return Object.keys(categoryRevenue).map(cat => ({
    category: cat,
    revenue: categoryRevenue[cat].revenue,
    orders: categoryRevenue[cat].orders
  }));
}



//get admin dashboard data
exports.getDashboard = catchAsyncErrors(async (req, res, next)=>{
  const products = await Product.find();
  const orders = await Order.find().populate({
    path: "orderItems.product",
    populate: {
      path: "category",          
      select: "name slug"  
    }
  });
  const users = await User.find();

  let total_revenue = 0;

  for (const order of orders) {
    if (["Processing", "Shipped", "Delivered"].includes(order.orderStatus)) {
      total_revenue += order.totalPrice;
    }
  }

  
  // Sales Over Time  -- Daily/weekly/monthly revenue trend
  const dailySales   = getRevenueTrend(orders, "daily");
  const weeklySales  = getRevenueTrend(orders, "weekly");
  const monthlySales = getRevenueTrend(orders, "monthly");

  //Revenue by Category
  const revenueByCategory = getRevenueByCategory(orders);

  //Order Status Breakdown
  const statusCount = {};
  for (const order of orders) {
    const status = order.orderStatus || "Unknown";
    if (!statusCount[status]) {
      statusCount[status] = 0;
    }

    statusCount[status] += 1;
  }

  return universalFun.sendSuccess(
    responseMessage.SUCCESS.USERS_DATA_FETCH,
    {
      total_products: products.length,
      total_users: users.length,
      total_orders: orders.length,
      total_revenue,
      salesOverTime: {
        daily: dailySales,
        weekly: weeklySales,
        monthly: monthlySales
      },
      revenueByCategory,
      statusCount
    },
    res
  )
})




// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  return universalFun.sendSuccess(
    responseMessage.SUCCESS.USERS_DATA_FETCH,
    users,
    res
  )
});

// Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id).select(['-refreshToken', '-resetPasswordToken', '-password']);

  if (!user) {
    return next( new Errorhandler(responseMessage.ERROR.NO_USER_FOUND.customMessage, responseMessage.ERROR.NO_USER_FOUND.statusCode));
  }
  return universalFun.sendSuccess(
    responseMessage.SUCCESS.USERS_DATA_FETCH,
    user,
    res
  )
})

// update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  return universalFun.sendSuccess(
    responseMessage.SUCCESS.USERS_DATA_FETCH,
    {},
    res
  )
});

//delete user (admin)
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new Errorhandler(responseMessage.ERROR.NO_USER_FOUND.customMessage, responseMessage.ERROR.NO_USER_FOUND.statusCode)
    );
  }
  await User.deleteOne({_id: req.params.id})
  ;
  return universalFun.sendSuccess(
    responseMessage.SUCCESS.USER_DELETE,
    {},
    res
  )
});