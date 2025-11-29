const logging = require("../utils/logging")
const CryptoJS = require("crypto-js");

exports.sendSuccess = function (successMsg, data, res, receivedResponseObj) {
    let statusCode = successMsg.statusCode || 200;
    let message = successMsg.customMessage || SUCCESS.DEFAULT.customMessage;
    let responseObj = receivedResponseObj ? receivedResponseObj : { statusCode: statusCode, message: message, data: data || {} };

    logging.logResponse(responseObj);
    responseObj = CryptoJS.AES.encrypt(JSON.stringify(responseObj), process.env.ENCRYPT_KEY).toString();
    return res.status(statusCode).send(responseObj); 
};