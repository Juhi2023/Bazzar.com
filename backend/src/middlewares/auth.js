const Errorhandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const responseMessage = require('../utils/responseMessages')

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    //const token = req.headers['authorization'].replace("Bearer ", "")
    const { accessToken } = req.cookies;

    if (!accessToken) {
        return next(new Errorhandler("Please Login to access this resource", 401));
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
            return next(new Errorhandler(responseMessage.ERROR.TOKEN_INVALID.customMessage, responseMessage.ERROR.TOKEN_INVALID.statusCode));
        }
        req.user = await User.findById(decodedData.id, {first_name:1, last_name:1, profile_pic:1, phone:1, email:1, role:1, _id:1, address:1});
        next();
    })
});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return next(
        new Errorhandler(`Role: ${req.user.role} is not allowed to access this resouce `, 403));
    }

    next();
    };
};

