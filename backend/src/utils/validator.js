const Joi = require("joi");
const logging = require("./logging")
const constant = require("./constant");
const responseMessages = require('./responseMessages')
const Errorhandler = require("../utils/errorHandler");

const validateFields = function (req, res, next, schema){
    const result = schema.validate(req)
    if(result.error){
        let errorName = result.error.name;
        let errorReason = result.error.details !== undefined
            ? result.error.details[0].message
            : "Parameter missing or parameter type is wrong";

        next(new Errorhandler(errorName + " || " + errorReason, 403))
        return false;
    }
    return true;
}

//user
exports.registerUser = (req, res, next)=>{
    logging.startSection("registerUser");
    logging.logRequest(req);
    let schema = Joi.object().keys({
        first_name: Joi.string()
            .trim()
            .min(constant.MIN_NAME_SIZE)
            .max(constant.MAX_NAME_SIZE)
            .required(),
        last_name: Joi.string()
            .trim()
            .min(constant.MIN_NAME_SIZE)
            .max(constant.MAX_NAME_SIZE)
            .required(),
        email: Joi.string().trim()
            .regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            .email({ minDomainSegments: 2})
            .required(),
        password: Joi.string()
            .trim()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.{8,})[^\s]+$/)
            .min(constant.PASSWORD_MIN_SIZE)
            .max(constant.PASSWORD_MAX_SIZE)
            .required(),
        phone: Joi.string().max(17)
            .regex(/^[+]{1}[0-9]+[-]{1}[0-9]+$/)
            .required(),
        profile_pic: Joi.string().optional(),
        role: Joi.any().valid('user', 'admin')
    })

    let validFields = validateFields(req.body, res, next, schema);
    if (validFields) {
      next();
    } 
}

exports.verifyOTP = (req, res, next)=>{
    logging.startSection("verifyOTP");
    logging.logRequest(req);
    let schema = Joi.object().keys({
        phone: Joi.string().max(17)
            .regex(/^[+]{1}[0-9]+[-]{1}[0-9]+$/)
            .required(),
        otp: Joi.string().length(6).required(),
    })

    let validFields = validateFields(req.body, res, next, schema);
    if (validFields) {
      next();
    } 
}

exports.resendOTP = (req, res, next)=>{
    logging.startSection("resendOTP");
    logging.logRequest(req);
    let schema = Joi.object().keys({
        phone: Joi.string().max(17)
            .regex(/^[+]{1}[0-9]+[-]{1}[0-9]+$/)
            .required(),
    })

    let validFields = validateFields(req.body, res, next, schema);
    if (validFields) {
      next();
    } 
}

exports.loginUser = (req, res, next)=>{
    logging.startSection("loginUser");
    logging.logRequest(req);
    let schema = Joi.object().keys({
        email: Joi.string()
            .trim()
            .regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            .email({ minDomainSegments: 2})
            .required(),
        password: Joi.string()
            .trim()
            .required(),
    })

    let validFields = validateFields(req.body, res, next, schema);
    if (validFields) {
      next();
    } 
    
}

exports.forgotPassword = (req, res, next)=>{
    logging.startSection("forgotPassword");
    logging.logRequest(req);
    let schema = Joi.object().keys({
        email: Joi.string()
            .trim()
            .regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            .email({ minDomainSegments: 2})
            .required(),
    })

    let validFields = validateFields(req.body, res, next, schema);
    if (validFields) {
      next();
    }  
}

exports.resetPassword = (req, res, next)=>{
    logging.startSection("resetPassword");
    logging.logRequest(req);
    let schema = Joi.object().keys({
        password: Joi.string()
            .trim()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.{8,})[^\s]+$/)
            .min(constant.PASSWORD_MIN_SIZE)
            .max(constant.PASSWORD_MAX_SIZE)
            .required(),

        confirmPassword: Joi.any().valid(Joi.ref('password'))
    })

    let validFields = validateFields(req.body, res, next, schema);
    if (validFields) {
      next();
    }  
}

exports.updatePassword = (req, res, next)=>{
    logging.startSection("updatePassword");
    logging.logRequest(req);
    let schema = Joi.object().keys({
        oldPassword: Joi.string()
            .trim()
            .required(),

        newPassword: Joi.string()
            .trim()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.{8,})[^\s]+$/)
            .min(constant.PASSWORD_MIN_SIZE)
            .max(constant.PASSWORD_MAX_SIZE)
            .required(),

        confirmPassword: Joi.any().valid(Joi.ref('newPassword'))
    })

    let validFields = validateFields(req.body, res, next, schema);
    if (validFields) {
        next();
    }  
}

exports.updateProfile = (req, res, next)=>{
    logging.startSection("updateProfile");
    logging.logRequest(req);
    let schema = Joi.object().keys({
        profile_pic: Joi.string().allow("").optional(),
        first_name: Joi.string()
            .trim()
            .min(constant.MIN_NAME_SIZE)
            .max(constant.MAX_NAME_SIZE)
            .required()
            .allow("").optional()
            ,
        last_name: Joi.string()
            .trim()
            .min(constant.MIN_NAME_SIZE)
            .max(constant.MAX_NAME_SIZE)
            .required()
            .allow("").optional()
            ,
        email: Joi.string().trim()
            .regex(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            .email({ minDomainSegments: 2})
            .allow("").optional()
            .required(),
        phone: Joi.string().max(17)
            .regex(/^[+]{1}[0-9]+[-]{1}[0-9]+$/)
            .required()
            .allow("").optional()
    })

    let validFields = validateFields(req.body, res, next, schema);
    if (validFields) {
        next();
    }  
}

exports.updateAddress = (req, res, next)=>{
    logging.startSection("updateAddress");
    logging.logRequest(req);
    let schema = Joi.object().keys({
        country: Joi.string()
            .trim()
            .required(),
        city: Joi.string()
            .trim()
            .required(),
        state: Joi.string()
            .trim()
            .required(),
        address: Joi.string()
            .trim()
            .required(),
        locality: Joi.string()
            .trim()
            .required(),
        pinCode: Joi.string()
            .trim()
            .required(),
    })

    let validFields = validateFields(req.body, res, next, schema);
    if (validFields) {
        next();
    }  
}

exports.getSingleUser = (req, res, next) => {
    logging.startSection("getSingleUser");
    logging.logRequest(req);
    let schema = Joi.object().keys({
        id: Joi.string()
            .required(),
    })

    let validFields = validateFields(req.params, res, next, schema);
    if (validFields) {
      next();
    } 
}

exports.updateUserRole = (req, res, next)=>{
    logging.startSection("updateUserRole");
    logging.logRequest(req);
    let schema = Joi.object().keys({
        role: Joi.any().valid("admin", "user")
    })

    let validFields = validateFields(req.body, res, next, schema);
    if (validFields) {
        next();
    }  
}

exports.deleteUser = (req, res, next) => {
    logging.startSection("deleteUser");
    logging.logRequest(req);
    let schema = Joi.object().keys({
        id: Joi.string()
            .required(),
    })

    let validFields = validateFields(req.params, res, next, schema);
    if (validFields) {
      next();
    } 
}

//product
exports.createProduct = (req, res, next)=>{
    logging.startSection("createProduct");
    logging.logRequest(req);
    let schema = Joi.object().keys({
        name: Joi.string()
            .trim()
            .min(constant.MIN_NAME_SIZE)
            .max(40)
            .required(),

        description: Joi.string()
            .trim()
            .min(constant.MIN_NAME_SIZE)
            .required(),
        
        price: Joi.number()
            .greater(100)
            .required(),
        
        images: Joi.array()
            .items(Joi.string())
            .min(1)
            .has(Joi.string())
            .required(),

        category: Joi.string()
            .trim()
            .min(constant.MIN_NAME_SIZE)
            .max(25)
            .required(),
        
        discountPercentage: Joi.number()
            .integer(),

        stock: Joi.number()
            .integer()
            .optional(),
    })

    let validFields = validateFields(req.body, res, next, schema);
    if (validFields) {
      next();
    } 
}

exports.updateProduct = (req, res, next)=>{
    logging.startSection("updateProduct");
    logging.logRequest(req);
    let schema = Joi.object().keys({
        name: Joi.string()
            .trim()
            .min(constant.MIN_NAME_SIZE)
            .max(40)
            .required(),

        description: Joi.string()
            .trim()
            .min(constant.MIN_NAME_SIZE)
            .required(),
        
        price: Joi.number()
            .greater(100)
            .required(),

        images: Joi.array()
            .items(Joi.string())
            .min(1)
            .has(Joi.string())
            .required(),

        category: Joi.string()
            .trim()
            .min(constant.MIN_NAME_SIZE)
            .max(25)
            .required(),
        
        stock: Joi.number()
            .integer()
            .optional(),
    })

    let validFields = validateFields(req.body, res, next, schema);
    if (validFields) {
      next();
    } 
}

exports.deleteProduct = (req, res, next) => {
    logging.startSection("deleteProduct");
    logging.logRequest(req);
    let schema = Joi.object().keys({
        id: Joi.string()
            .required(),
    })

    let validFields = validateFields(req.params, res, next, schema);
    if (validFields) {
      next();
    } 
}

exports.getProductDetails = (req, res, next) => {
    logging.startSection("getProductDetails");
    logging.logRequest(req);
    let schema = Joi.object().keys({
        id: Joi.string()
            .required(),
    })

    let validFields = validateFields(req.params, res, next, schema);
    if (validFields) {
      next();
    } 
}

exports.createProductReview = (req, res, next)=>{
    logging.startSection("createProductReview");
    logging.logRequest(req);
    let schema = Joi.object().keys({
        productId: Joi.string()
            .required(),

        rating: Joi.number()
            .integer()
            .min(1)
            .max(5)
            .required(),

        comment: Joi.string()
            .trim()
            .required(),
    })

    let validFields = validateFields(req.body, res, next, schema);
    if (validFields) {
      next();
    } 
}

exports.getProductReviews = (req, res, next) => {
    logging.startSection("getProductReviews");
    logging.logGetRequest(req);
    let schema = Joi.object().keys({
        id: Joi.string()
            .required(),
    })

    let validFields = validateFields(req.query, res, next, schema);
    if (validFields) {
      next();
    } 
}

exports.deleteReview = (req, res, next) => {
    logging.startSection("deleteReview");
    logging.logGetRequest(req);
    let schema = Joi.object().keys({
        productId: Joi.string()
            .required(),
        
        reviewId: Joi.string()
            .required(),
    })

    let validFields = validateFields(req.query, res, next, schema);
    if (validFields) {
      next();
    } 
}

//order
exports.newOrder = (req, res, next)=>{
    logging.startSection("newOrder");
    logging.logRequest(req);
    let schema = Joi.object().keys({
        shippingInfo: Joi.object({
            address: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            country: Joi.string().required(),
            pinCode: Joi.number().integer().required(),
            phoneNo: Joi.number().integer(),
            locality: Joi.string()
        }),

        paymentInfo: Joi.object({
            id: Joi.string().required(),
            status: Joi.string().required()
        }),

        orderItems: Joi.array()
            .items(Joi.object({
                name: Joi.string().required(),
                price: Joi.number().integer().required(),
                quantity: Joi.number().integer().required(),
                image: Joi.string().required(),
                product: Joi.string().required()
            }))
            .min(1)
            //.has(Joi.string())
            .required(),    
            
        itemsPrice: Joi.number().required(),
        taxPrice: Joi.number().required(),
        shippingPrice: Joi.number().required(),
        totalPrice: Joi.number().required()

    })

    let validFields = validateFields(req.body, res, next, schema);
    if (validFields) {
      next();
    } 
}

exports.getSingleOrder = (req, res, next) => {
    logging.startSection("getSingleOrder");
    logging.logRequest(req);
    let schema = Joi.object().keys({
        id: Joi.string()
            .required(),
    })

    let validFields = validateFields(req.params, res, next, schema);
    if (validFields) {
      next();
    } 
}

exports.updateOrder = (req, res, next) => {
    logging.startSection("updateOrder");
    logging.logRequest(req);
    let schema = Joi.object().keys({
        status: Joi.string()
            .valid("Shipped", "Delivered", "cancel")
            .required(),
    })

    let validFields = validateFields(req.body, res, next, schema);
    if (validFields) {
      next();
    } 
}


exports.deleteOrder = (req, res, next) => {
    logging.startSection("deleteProduct");
    logging.logRequest(req);
    let schema = Joi.object().keys({
        id: Joi.string()
            .required(),
    })

    let validFields = validateFields(req.params, res, next, schema);
    if (validFields) {
      next();
    } 
}

//category
exports.createCategory = (req, res, next)=>{
    logging.startSection("createCategory");
    logging.logRequest(req);
    let schema = Joi.object().keys({
        name: Joi.string()
            .trim()
            .min(constant.MIN_NAME_SIZE)
            .max(40)
            .required(),
    })

    let validFields = validateFields(req.body, res, next, schema);
    if (validFields) {
      next();
    } 
}

exports.updateCategory = (req, res, next)=>{
    logging.startSection("updateCategory");
    logging.logRequest(req);
    let schema = Joi.object().keys({
        name: Joi.string()
            .trim()
            .min(constant.MIN_NAME_SIZE)
            .max(40)
            .required(),
    })

    let validFields = validateFields(req.body, res, next, schema);
    if (validFields) {
      next();
    } 
}

exports.deleteCategory = (req, res, next) => {
    logging.startSection("deleteCategory");
    logging.logRequest(req);
    let schema = Joi.object().keys({
        id: Joi.string()
            .required(),
    })

    let validFields = validateFields(req.params, res, next, schema);
    if (validFields) {
      next();
    } 
}

//cart
exports.addCartItem = (req, res, next) => {
    logging.startSection("addCartItem");
    logging.logGetRequest(req);
    let schema = Joi.object().keys({
        productId: Joi.string()
            .required(),
        
        quantity: Joi.number().integer()
            .required(),
    })

    let validFields = validateFields(req.body, res, next, schema);
    if (validFields) {
      next();
    } 
}

exports.deleteCartItem = (req, res, next) => {
    logging.startSection("deleteCartItem");
    logging.logGetRequest(req);
    let schema = Joi.object().keys({
        productId: Joi.string()
            .required()
    })

    let validFields = validateFields(req.body, res, next, schema);
    if (validFields) {
      next();
    } 
}

//payment
exports.paymentProcess = (req, res, next) => {
    logging.startSection("paymentProcess");
    logging.logGetRequest(req);
    let schema = Joi.object().keys({
        amount: Joi.number()
            .required()
    })

    let validFields = validateFields(req.body, res, next, schema);
    if (validFields) {
      next();
    } 
}