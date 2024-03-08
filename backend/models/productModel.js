const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "enter the name of product"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "enter the description of product"],
  },
  stock: {
    type: Number,
    required: [true, "enter the stock of product"],
    maxLength: [8, "can't exceed from 8 digit"],
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "enter the price of product"],
    maxLength: [7, "can't exceed from 7digit"],
  },
  category: {
    type: String,
    required: [true, "enter the category of product"],
  },
  noofreview: {
    type: Number,
    default: 0,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  reviews: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
