const router = require("express").Router();
const {
  processPayment,
  sendStripekey,
} = require("../controllers/paymentController");
const { isAuthenticatedUser, authorisedRoles } = require("../middlewares/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/stripeapikey").get(isAuthenticatedUser, sendStripekey);
module.exports = router;
