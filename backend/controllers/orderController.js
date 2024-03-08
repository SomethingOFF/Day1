const AsyncError = require("../middlewares/AsyncError");
const orderModel = require("../models/orderModel");
const ErrorHandler = require("../utils/ErrorHandler");
const productModel = require("../models/productModel");
exports.createNewOrder = AsyncError(async (req, res, next) => {
  const bodyContent = req.body;
  const order = await orderModel.create({
    ...bodyContent,
    paidAt: Date.now(),
    user: req.user,
  });
  if (!order) {
    return next(new ErrorHandler("order is not created check it again", 400));
  }
  res.status(200).json({
    success: true,
    message: "order is created succesfully",
    order,
  });
});

exports.orderDetails = AsyncError(async (req, res, next) => {
  const order = await orderModel
    .findById(req.params.id)
    .populate("user", "name email");
  if (!order) {
    return next(new ErrorHandler("order is not found!", 400));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

exports.myOrders = AsyncError(async (req, res, next) => {
  const orders = await orderModel.find({ user: req.user });
  res.status(200).json({
    success: true,
    orders,
  });
});

exports.getAllOrders = AsyncError(async (req, res, next) => {
  const orders = await orderModel.find();
  let totalAmount = 0;
  orders.forEach((element) => {
    totalAmount += orders.totalPrice;
  });
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

exports.updateOrder = AsyncError(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("order is not found!", 400));
  }
  if (!order.orderStatus !== "Delivered") {
    return next(new ErrorHandler("order is already deleverd", 400));
  }
  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (ord) => {
      await updateStock(ord.product, ord.qunatity);
    });
  }
  order.orderStatus = req.body.status;
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    message: "order is updated",
  });
});

async function updateStock(id, quantity) {
  const product = await productModel();
  if (!product) {
    return next(new ErrorHandler("product is not found!", 400));
  }
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

exports.deleteOrder = AsyncError(async (req, res, next) => {
  let order = await order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("order is not found!", 400));
  }
  await order.remove();
  res.status(200).json({
    success: true,
  });
});
