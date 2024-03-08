const AsyncError = require("./AsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const userModel = require("../models/userModel");
exports.isAuthenticatedUser = AsyncError(async (req, res, next) => {
  const {auth} = req.cookies;
  if (!auth) {
    return next(new ErrorHandler("auth is expired", 400));
  }
  const isVerified = require("jsonwebtoken").verify(
    auth,
    process.env.SECRET_KEY
  );
  req.user = await userModel.findById(isVerified.id);
  next();
});

exports.authorisedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return next(
        new ErrorHandler(
          "user is not authorised for this page so please ask to admin",
          400
        )
      );
    }
    next();
  };
};
