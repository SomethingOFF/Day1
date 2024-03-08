const AsyncError = require("../middlewares/AsyncError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = AsyncError(async (req, res, next) => {
  const mypayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "ECOMMERCE",
    },
  });
  res.status(200).json({
    success: true,
    client_secret: mypayment.client_secret,
  });
});

exports.sendStripekey = AsyncError(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
