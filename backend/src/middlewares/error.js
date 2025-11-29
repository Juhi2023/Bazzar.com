const Errorhandler = require("../utils/errorHandler")
const responseMessage = require("../utils/responseMessages")

module.exports = (err, req, res, next) =>{
    err.statusCode = err.statusCode || responseMessage.ERROR.DEFAULT.statusCode;
    err.message = err.message || responseMessage.ERROR.DEFAULT.customMessage;
    
    //wrong mondoDB id error which comes when uses findById function in moongose
    if(err.name === "CastError"){
        const message = `Resource not found, Invalid: ${err.path}`;
        err = new Errorhandler(message, 400)
    }

    res.status(err.statusCode).json({statusCode : err.statusCode, error: err.message})
}

