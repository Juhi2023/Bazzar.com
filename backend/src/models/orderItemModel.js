const mongoose = require("mongoose");
const validator = require("validator");

const orderSchema = new mongoose.Schema({
    orderID: {
        type: mongoose.Schema.ObjectId,
        ref: "Order",
        required: true
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true
    },
    itemsName:{ 
        type: Number, 
        required: true,
        default: 0
    },
    quantity: { type: Number, required: true},
    itemsPrice:{ 
        type: Number, 
        required: true,
        default: 0
    },
    orderStatus: {
        type: String,
        default: "Processing",
        enum: ["Processing", "Shipped", "Delivered", "Cancel"],
        required: true
    },
    taxPrice: { 
        type: Number, 
        required: true,
        default: 0
    },
    shippingPrice: { 
        type: Number, 
        required: true,
        default: 0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    
    deliveredAt: Date,

    createdAt: {
        type: Date,
        default: Date.now,
    },

    deleteAt: {
        type: Date,
        expires: '30d',
        default: null
    }
  
});



module.exports = mongoose.model("Order", orderSchema);