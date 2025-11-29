const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");
const Errorhandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const universalFun  = require("../utils/universalFunctions")
const responseMessage = require('../utils/responseMessages');
const { default: slugify } = require("slugify");
const jwt = require("jsonwebtoken");

exports.createProduct = catchAsyncErrors(async(req, res, next)=>{
  req.body.user = req.user.id;
  const product = await Product.create({...req.body, slug: slugify(req.body.name)});

  return universalFun.sendSuccess(
    responseMessage.SUCCESS.PRODUCT_CREATED,
    product,
    res
  )    
})

exports.updateProduct = catchAsyncErrors (async(req, res, next)=>{
  let product = await Product.findOne({_id: req.params.id});
  if(!product){
      return next(new Errorhandler(responseMessage.ERROR.PRODUCT_NOT_FOUND.customMessage, responseMessage.ERROR.PRODUCT_NOT_FOUND.statusCode))
  }

  product = await Product.findByIdAndUpdate(req.params.id, {...req.body, slug: slugify(req.body.name)}, {
      new: true,
      runValidators: true,
      useFindAndModify: false
  })
  return universalFun.sendSuccess(
    responseMessage.SUCCESS.PRODUCT_UPDATE,
    product,
    res
  )    
})

exports.deleteProduct = catchAsyncErrors(async(req, res, next)=>{
  let product = await Product.findOne({_id: req.params.id});
  if(!product){
    return next(new Errorhandler(responseMessage.ERROR.PRODUCT_NOT_FOUND.customMessage, responseMessage.ERROR.PRODUCT_NOT_FOUND.statusCode))
  }

  product = await Product.findByIdAndDelete(req.params.id)
  return universalFun.sendSuccess(
    responseMessage.SUCCESS.PRODUCT_DELETE,
    {},
    res
  )  

})

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = parseInt(req.query.resultPerPage) || 25;
  const productsCount = await Product.countDocuments();

  // Filter For Price and Rating
  let PriceAndRatingData = JSON.stringify({price: req.query.price, rating: req.query.rating});
  PriceAndRatingData = PriceAndRatingData.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
  PriceAndRatingData = JSON.parse(PriceAndRatingData)
  Object.keys(PriceAndRatingData).forEach(function(key){
    Object.keys(PriceAndRatingData[key]).forEach(function(key1){
        PriceAndRatingData[key][key1] = parseInt(PriceAndRatingData[key][key1])
    });
  });

  //filter for category
  const categoryData = typeof(req.query.category) === "string" ? [req.query.category] : req.query.category;

  //sorting
  const sortBy = req.query.sortBy;
  let sortParam = null ;
  if(sortBy==="rating"){
      sortParam = {"rating": -1}
  }else if(sortBy==="price:LH"){
      sortParam = {"price": 1}
  }else if(sortBy==="price:HL"){
      sortParam = {"price": -1}
  }else if(sortBy==="latest"){
      sortParam = {"createdAt": -1}
  }

  //pagination
  const currentPage = Number(req.query.page)|| 1;
  const skip = resultPerPage * (currentPage -1);

  const filteredData = await Product.aggregate([
    {
      "$lookup": {
        "from": "categories",
        "localField": "category",
        "foreignField": "_id",
        "as": "category"
      }
    },
    {
      "$match": {
        //search
        ...(req.query.keyword && {name: {
          $regex: req.query.keyword,
          $options: "i",
        }}),

        // Filter For Price and Rating
        ...PriceAndRatingData,

        // Filter for category
        ...(categoryData && {"category.slug": {
          $in: categoryData
        }}),
      },
    },
    
    ...(sortParam ? [{ $sort : sortParam }]: []),

    {
      "$facet": {
        "total": [
          {
            "$count": "productsCount"
          }
        ],
        "products": [
          {
            $skip: skip
          },
          {
            $limit: resultPerPage
          }
        ]
      }
    }
  ])
  
  const products = filteredData[0].products

  let filteredProductsCount =  filteredData[0].total[0]?.productsCount;

  return universalFun.sendSuccess(
    responseMessage.SUCCESS.PRODUCT_LIST_FETCH,
    {
      products,
      productsCount,
      resultPerPage,
      filteredProductsCount
    },
    res
  )
});

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findOne({ _id: req.params.id }).populate("category");
  if (!product) {
    return next(
      new Errorhandler(
        responseMessage.ERROR.PRODUCT_NOT_FOUND.customMessage,
        responseMessage.ERROR.PRODUCT_NOT_FOUND.statusCode
      )
    );
  }

  const { accessToken } = req.cookies;
  let cart;
  let canReview = false; // default

  if (accessToken) {
    jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET, async (err, decodedData) => {
      if (!err) {
        const userId = decodedData.id;
        cart = await Cart.findOne({ user: userId, 'cartItems.product': req.params.id });

        const order = await Order.findOne({
          user: userId,
          'orderItems.product': req.params.id,
          orderStatus: 'Delivered'
        });

        canReview = order ? true : false;
        
        // check if logged user matched
        const reviewsWithFlag = product.reviews.map((review) => ({
          ...review.toJSON(),
          isUserReview: userId && review.user.toString() === userId, // true if logged-in user wrote it
        }));

        return universalFun.sendSuccess(
          responseMessage.SUCCESS.PRODUCT_DETAILS,
          {
            ...product.toJSON(),
            addedInCart: cart ? true : false,
            canReview,
            reviews: reviewsWithFlag
          },
          res
        );
      } else {
        return universalFun.sendSuccess(
          responseMessage.SUCCESS.PRODUCT_DETAILS,
          {
            ...product.toJSON(),
            addedInCart: false,
            canReview: false
          },
          res
        );
      }
    });
  } else {
    // Not logged in
    return universalFun.sendSuccess(
      responseMessage.SUCCESS.PRODUCT_DETAILS,
      {
        ...product.toJSON(),
        addedInCart: false,
        canReview: false
      },
      res
    );
  }
});


//Create new review or update review
exports.createProductReview = catchAsyncErrors(async(req, res, next)=>{
    const {rating, comment, productId} = req.body;
    const review = {
        user: req.user._id,
        name: req.user.first_name + " " + req.user.last_name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString())

    if(isReviewed){
        product.reviews.forEach(element => {
            if(element.user.toString() === req.user._id.toString()){
                element.rating = rating;
                element.comment = comment;
            }
        });
    }else{
        product.reviews.push(review);
        product.numberOfReviews = product.reviews.length
    }

    let avg=0;
    product.rating = product.reviews.forEach(rev=>{
        avg += rev.rating
    })/product.reviews.length;

    await product.save({validateBeforeSave: false})

    return universalFun.sendSuccess(
      responseMessage.SUCCESS.REVIEW_CREATED,
      {},
      res
    )
})

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if (!product) {
      return next(new Errorhandler(responseMessage.ERROR.PRODUCT_NOT_FOUND.customMessage, responseMessage.ERROR.PRODUCT_NOT_FOUND.statusCode))
    }

    return universalFun.sendSuccess(
      responseMessage.SUCCESS.REVIEW_FETCHED,
      product.reviews,
      res
    )
  });

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new Errorhandler(responseMessage.ERROR.PRODUCT_NOT_FOUND.customMessage, responseMessage.ERROR.PRODUCT_NOT_FOUND.statusCode))
    }
  

    const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.reviewId.toString());
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    
    return universalFun.sendSuccess(
      responseMessage.SUCCESS.REVIEW_DELETED,
      {},
      res
    )
  
  });