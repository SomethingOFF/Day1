const router = require("express").Router();
const {
  createNewOrder,
  orderDetails,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { isAuthenticatedUser, authorisedRoles } = require("../middlewares/auth");

router.route("/order").post(isAuthenticatedUser, createNewOrder);
router.route("/order/:id").get(isAuthenticatedUser, orderDetails);
router.route("/order/me").get(isAuthenticatedUser, myOrders);
router
  .route("/admin/order")
  .get(isAuthenticatedUser, authorisedRoles("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorisedRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorisedRoles("admin"), deleteOrder);

module.exports = router;
