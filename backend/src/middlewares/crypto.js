const CryptoJS = require("crypto-js");
const logging = require("../utils/logging")

decode = async (req) => {
    if(Object.keys(req.body).length != 0){
        console.log(req.body);
        req.body = req.body.data.newData;
        var bytes = CryptoJS.AES.decrypt(req.body, process.env.ENCRYPT_KEY);
        req.body = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

    return req;
};

const crypto = {
    decode: decode
};
module.exports = crypto;