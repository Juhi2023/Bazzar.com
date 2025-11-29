
import {REACT_APP_ENCRYPTION_KEY} from '../config/constant'
const CryptoJS = require("crypto-js");

export const encryptUrlData = (data) => {
    return CryptoJS.AES.encrypt(data, REACT_APP_ENCRYPTION_KEY).toString()
}
export const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), REACT_APP_ENCRYPTION_KEY).toString()
}

export const decryptData = (data) => {
    var bytes = CryptoJS.AES.decrypt(data, REACT_APP_ENCRYPTION_KEY);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    
    return decryptedData
}