const express = require("express");
const orderControllers = require("../controllers/orderControllers");
const {isAuthenticatedUser, authorizeRoles} = require("../middlewares/auth")
const validator = require("../utils/validator")
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, validator.newOrder, orderControllers.newOrder)

router.route("/order/me").get(isAuthenticatedUser, orderControllers.myOrders)
//always write params route in last
router.route("/order/:id").get(isAuthenticatedUser, validator.getSingleOrder, orderControllers.getSingleOrder)

router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), orderControllers.getAllOrders);

router.route("/admin/orders/cancel/:id").put(isAuthenticatedUser, authorizeRoles("user", "admin"), orderControllers.cancelOrder);

router.route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), validator.updateOrder, orderControllers.updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), validator.deleteOrder, orderControllers.deleteOrder);

module.exports = router;