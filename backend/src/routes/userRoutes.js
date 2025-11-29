const express = require("express");
const userControllers = require("../controllers/userControllers");
const {isAuthenticatedUser, authorizeRoles} = require("../middlewares/auth")
const validator = require("../utils/validator")
const router = express.Router();

const multer=require('multer')
const upload=multer({storage: multer.memoryStorage()})


router.route('/register').post(validator.registerUser, userControllers.registerUser)

router.route('/verifyOTP').post(validator.verifyOTP, userControllers.verifyOTP)

router.route('/resendOTP').post(validator.resendOTP, userControllers.resendOTP)

router.route('/login').post(validator.loginUser, userControllers.loginUser)

router.route('/logout').get(userControllers.logout)

router.route('/auth-status').get(userControllers.authStatus)

router.route('/password/forgot').post(validator.forgotPassword, userControllers.forgotPassword)

router.route('/password/reset/:resetToken').put(validator.resetPassword, userControllers.resetPassword)

router.route('/validate-reset-password-token/:resetToken').get(userControllers.validateResetPasswordToken)

router.route('/me').get(isAuthenticatedUser , userControllers.getUserDetails)
    .delete(isAuthenticatedUser , userControllers.deleteAccount)

router.route('/user-address').get(isAuthenticatedUser , userControllers.getUserAddress)

router.route('/password/update').put(isAuthenticatedUser , validator.updatePassword, userControllers.updatePassword)

router.route('/address/update').put(isAuthenticatedUser , validator.updateAddress, userControllers.updateAddress)

router.route('/me/update').put(isAuthenticatedUser, upload.single('profile_pic'), validator.updateProfile, userControllers.updateProfile)




// Admin
router.route('/admin/dashboard').get(isAuthenticatedUser, authorizeRoles("admin"), userControllers.getDashboard)

router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles("admin"), userControllers.getAllUser)

router.route('/admin/user/:id')
    .get(isAuthenticatedUser, authorizeRoles("admin"), validator.getSingleUser, userControllers.getSingleUser)
    .put(isAuthenticatedUser, authorizeRoles("admin"), validator.updateUserRole, userControllers.updateUserRole)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), validator.deleteUser, userControllers.deleteUser)

module.exports = router;