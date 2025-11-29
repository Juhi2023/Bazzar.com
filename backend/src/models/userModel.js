const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("node:crypto");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please Enter Your First Name"],
    maxLength: [30, "First Name cannot exceed 30 characters"],
    minLength: [4, "First Name should have more than 4 characters"],
  },
  last_name: {
    type: String,
    required: [true, "Please Enter Your Last Name"],
    maxLength: [30, "Last Name cannot exceed 30 characters"],
    minLength: [4, "Last Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  phone: {
    type: String,
    required: true,
  },
  mobileOTP: {
    type: String,
  },
  phoneVerified: {
    type: Boolean,
    default: false
  },
  profile_pic: {
    path: {
      type: String 
    },
    url:{
      type: String 
    }
  },
  address: {
    country:{
      type: String
    },
    city:{
      type: String
    },
    state:{
      type: String
    },
    address:{
      type: String
    },
    pinCode:{
      type: String
    },
    locality:{
      type: String
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tokens: [
    {
      accessToken: {
        type: String
      },
      refreshToken: {
        type: String
      }
    }
  ],

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

//compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


//reset password token generation
userSchema.methods.getResetpasswordToken = async function(){
  //generating token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //hashing and adding resetPassword Token to userSchema
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
  this.resetPasswordExpire = Date.now() + (15 * 60 * 1000)
  return resetToken;
}

module.exports = mongoose.model("User", userSchema);

