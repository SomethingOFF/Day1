const crypto = require("crypto");
const cloudinary = require("cloudinary");
const cron = require("node-cron");
const AsyncError = require("../middlewares/AsyncError");
const sendToken = require("../utils/sendToken");
const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");

exports.createUser = AsyncError(async (req, res, next) => {
  const { name, username, email, password } = req.body;
  const avatar = req.files.avatar;
  const tempFilePath = "./backend/uploads/" + avatar.name;
  await avatar.mv(tempFilePath);
  const cloud = await cloudinary.v2.uploader.upload(tempFilePath, {
    folder: "day1",
    crop: "scale",
  });
  const user = await userModel.create({
    name,
    username,
    email,
    password,
    avatar: {
      public_id: cloud.public_id,
      url: cloud.url,
    },
  });

  if (!user) {
    return next(new ErrorHandler("check it again or ask to admin", 400));
  }
  sendToken(user, 200, res, "user created successfully");
});

exports.loginUser = AsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return next(
      new ErrorHandler("user credentials are not avaible check again", 400)
    );
  }
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("check it again or ask to admin", 400));
  }
  const isVerified = await user.comparePassword(password);
  if (!isVerified) {
    return next(new ErrorHandler("check it again or ask to admin", 400));
  } else {
    sendToken(user, 200, res, "user logged in successfully");
  }
});

exports.logoutUser = AsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("auth", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "user logged out successfully",
    });
});

exports.forgetPassword = AsyncError(async (req, res, next) => {
  const user = req.user;
  const token = user.getResetPasswordToken();
  const url = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/reset/password/:${token}`;
  await user.save();
  res.status(200).json({
    success: true,
    message: "user reset password link sent over the email",
    user,
    url,
  });
});

exports.resetPassword = AsyncError(async (req, res, next) => {
  const token = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user =
    (await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpire: { $gte: Date.now() },
    })) || req.user;
  const { password, confirmPassword } = req.body;
  if (!password && !confirmPassword) {
    return next(new ErrorHandler("credentials are not found!", 400));
  }
  user.password = await password;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpire = undefined;
  await user.save();
  sendToken(user, 200, res, "password reset successfully");
});

exports.getMyProfile = AsyncError(async (req, res, next) => {
  const user = await req.user;
  res.status(200).json({
    success: true,
    message: "Oh! you are back",
    user,
  });
});

exports.updateMyProfile = AsyncError(async (req, res, next) => {
  const user = req.user;
  const bodycontent = req.body;
  console.log(req.files);
  if (req.files !== undefined) {
    const avatar = req.files.avatar;
    const tempFilePath = "./backend/uploads/" + avatar.name;
    await avatar.mv(tempFilePath);
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    const mycloud = await cloudinary.v2.uploader.upload(tempFilePath, {
      folder: "day1",
      crop: "scale",
    });
    bodycontent.avatar = {
      public_id: mycloud.public_id,
      url: mycloud.url,
    };
  }
  const updateduser = await userModel.findOneAndUpdate(
    { email: user.email },
    { ...bodycontent },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "user is updated successfully",
    user: updateduser,
  });
});

exports.admin__getAllUsers = AsyncError(async (req, res, next) => {
  const users = await userModel.find();
  res.status(200).json({
    success: true,
    message: "all users served successfully",
    users,
  });
});

exports.admin__getUser = AsyncError(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("user is not found!", 400));
  }
  res.status(200).json({
    success: true,
    message: "user has been served",
    user,
  });
});

exports.admin__updateUser = AsyncError(async (req, res, next) => {
  let user = await userModel.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("user is not found!", 400));
  }
  if (req.files !== undefined) {
    const avatar = req.files.avatar;
    const tempPath = "./backend/uploads/" + avatar.name;
    await avatar.mv(tempPath);
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    const mycloud = await cloudinary.v2.uploader.upload(tempPath, {
      folder: "day1",
      crop: "scale",
    });
    req.body.avatar = {
      public_id: mycloud.public_id,
      url: mycloud.url,
    };
  }
  user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "user has been updated",
    user,
  });
});

exports.admin__deleteUser = AsyncError(async (req, res, next) => {
  let user = await userModel.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("user is not found!", 400));
  }
  await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  await user.remove();
  res.status(200).json({
    success: true,
    message: "user has been deleted",
    user,
  });
});
