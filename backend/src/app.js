const express = require("express");
const app = express()
const cookieParser = require('cookie-parser');
const admin = require("firebase-admin");
const { getStorage } = require("firebase-admin/storage");
var serviceAccount = require("../serviceAccountKey.json");
const errorMiddleware = require("./middlewares/error")
const crypto = require('./middlewares/crypto');
const productRoutes = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes")
const orderRoutes = require("./routes/orderRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const cartRoutes = require("./routes/cartRoutes")
const paymentRoutes = require("./routes/paymentRoutes")
const cors = require('cors')
const compression=require('compression')

app.use(express.json({limit: '10000mb'}))
app.use(express.text({ type: 'text/*' }))
app.use(express.urlencoded({ limit: '10000mb', extended: true}));
app.use(cookieParser())
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001', process.env.FRONTEND_URL], credentials: true }))

//firebase setup
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.STORAGE_BUCKET
});

//express functionalit
//The app.locals object has properties that are local variables within the application, and will be available in templates rendered with res.render.
global.bucket = getStorage().bucket()

app.use(async (req, res, next) => {  //this function will decode the the crypto request
	await crypto.decode(req);
	next();
});

//route
app.use("/api/v1", userRoutes)
app.use("/api/v1", productRoutes)
app.use("/api/v1", orderRoutes)
app.use("/api/v1", categoryRoutes)
app.use("/api/v1", cartRoutes)
app.use("/api/v1", paymentRoutes)


//middleware for error handler
app.use(errorMiddleware)

module.exports = app;