const Category = require("../models/categoryModel");
const Errorhandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const universalFun  = require("../utils/universalFunctions")
const responseMessage = require('../utils/responseMessages');
const { default: slugify } = require("slugify");

exports.createCategory = catchAsyncErrors(async(req, res, next)=>{

  let category = await Category.findOne({name: req.body.name.toLowerCase()})

  if(category){
    return next(new Errorhandler(responseMessage.ERROR.CATEGORY_ALREADY_EXISTS.customMessage, responseMessage.ERROR.CATEGORY_ALREADY_EXISTS.statusCode))
  }
  
  category = await Category.create({name: req.body.name.toLowerCase(), slug: slugify(req.body.name)});

  return universalFun.sendSuccess(
    responseMessage.SUCCESS.CATEGORY_CREATED,
    category,
    res
  )    
})

exports.getAllCategories = catchAsyncErrors(async (req, res, next) => {
    const categories = await Category.find();

    return universalFun.sendSuccess(
      responseMessage.SUCCESS.CATEGORY_LIST_FETCH,
      {
        categories
      },
      res
    )
  });

exports.updateCategory = catchAsyncErrors (async(req, res, next)=>{
    let category = await Category.findById(req.params.id);
    if(!category){
        return next(new Errorhandler(responseMessage.ERROR.CATEGORY_NOT_FOUND.customMessage, responseMessage.ERROR.CATEGORY_NOT_FOUND.statusCode))
    }
  
    category = await Category.findByIdAndUpdate(req.params.id, {...req.body, slug: slugify(req.body.name)}, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    return universalFun.sendSuccess(
      responseMessage.SUCCESS.CATEGORY_UPDATE,
      category,
      res
    )    
})
  
exports.deleteCategory = catchAsyncErrors(async(req, res, next)=>{
    let category = await Category.findById(req.params.id);
    if(!category){
      return next(new Errorhandler(responseMessage.ERROR.CATEGORY_NOT_FOUND.customMessage, responseMessage.ERROR.CATEGORY_NOT_FOUND.statusCode))
    }
  
    product = await Category.findByIdAndDelete(req.params.id)
    return universalFun.sendSuccess(
      responseMessage.SUCCESS.CATEGORY_DELETED,
      {},
      res
    )  
  
  })
  