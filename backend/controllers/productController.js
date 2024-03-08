const AsyncError = require("../middlewares/AsyncError");
const productModel = require("../models/productModel");
const ApiFeature = require("../utils/ApiFeatures");
const ErrorHandler = require("../utils/ErrorHandler");
const cloudinary = require("cloudinary");
exports.admin__createProduct = AsyncError(async (req, res, next) => {
  let images = [];

  if (typeof req.files.images === "string") {
    images.push(req.files.images);
  } else {
    images = req.files.images;
  }
  const imageslink = [];

  for (let i = 0; i < images.length; i++) {
    const avatar = images[i];
    const tempPath = "./backend/uploads/" + avatar.name;
    await avatar.mv(tempPath);
    const result = await cloudinary.v2.uploader.upload(tempPath, {
      folder: "products",
    });
    imageslink.push({
      public_id: result.public_id,
      url: result.url,
    });
  }
  req.body.images = imageslink;
  const bodyContent = req.body;

  const product = await productModel.create({ ...bodyContent, user: req.user });
  if (!product) {
    return next(new ErrorHandler("product creation problem", 400));
  }
  res.status(200).json({
    success: true,
    message: "product is created successfully",
    product,
  });
});

exports.admin__getProducts = AsyncError(async (req, res, next) => {
  const products = await productModel.find();
  res.status(200).json({
    success: true,
    products,
  });
});

exports.admin__updateProduct = AsyncError(async (req, res, next) => {
  let product = await productModel.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product is not found!", 400));
  }

  if (req.files) {
    let images = [];
    images.push(req.files.images);
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    const imageslink = [];
    for (let i = 0; i < images.length; i++) {
      const avatar = images[i];
      const tempPath = `./backend/uploads/` + avatar.name;
      await avatar.mv(tempPath);
      const result = await cloudinary.v2.uploader.upload(tempPath, {
        folder: "products",
      });
      imageslink.push({
        public_id: result.public_id,
        url: result.url,
      });
    }
    req.body.images = imageslink;
  }
  product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "product is updated successfully",
    product,
  });
});

exports.admin__deleteProduct = AsyncError(async (req, res, next) => {
  let product = await productModel.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product is not found!", 400));
  }
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "product is deleted successfully",
    product,
  });
});

exports.getALlProduct = AsyncError(async (req, res, next) => {
  const resultperPage = 8;
  const productCount = await productModel.countDocuments();
  const apiFeature = new ApiFeature(productModel.find(), req.query)
    .search()
    .filter()
    .pagination(resultperPage);
  let products = await apiFeature.query;
  let filteredProductsCount = products.length;
  res.status(200).json({
    success: true,
    message: "products has been served",
    products,
    productCount,
    resultperPage,
    filteredProductsCount,
  });
});

exports.getProduct = AsyncError(async (req, res, next) => {
  const product = await productModel.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product is not found!", 400));
  }
  res.status(200).json({
    success: true,
    message: "product is served here!",
    product,
  });
});

exports.getReviews = AsyncError(async (req, res, next) => {
  const product = await productModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

exports.createReview = AsyncError(async (req, res, next) => {
  let product = await productModel.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product is not found!", 400));
  }
  let review = {
    user: req.user._id,
    name: req.user.name,
    rating: req.body.rating,
    comment: req.body.comment,
  };
  let isReviewed = await product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.noofreview = product.reviews.length;
  }
  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

exports.deleteReview = AsyncError(async (req, res, next) => {
  const product = await productModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev.user.toString() !== req.user._id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const noofreview = reviews.length;

  await productModel.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      noofreview,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "product review is deleted",
  });
});
