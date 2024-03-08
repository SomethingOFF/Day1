const cookieParser = require("cookie-parser");
const express = require("express");
const fileUpload = require("express-fileupload");
const bodyparser = require("body-parser");
const cron = require('node-cron');

const middlewareError = require("./middlewares/error");
const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoutes");
const orderRoute = require("./routes/orderRoute");
const paymentRoute = require("./routes/paymentRoute");
const cleanTempFolder = require("./utils/cleanUpTemp");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(bodyparser.urlencoded({ extended: true }));
cron.schedule('0 * * * *',()=>{
    cleanTempFolder()
})

app.use("/api/v1", userRoute);
app.use("/api/v1", productRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", paymentRoute);

app.use(middlewareError);

module.exports = app;
