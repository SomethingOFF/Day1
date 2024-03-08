const router = require("express").Router();
const { isAuthenticatedUser, authorisedRoles } = require("../middlewares/auth");
const {
  admin__createProduct,
  admin__updateProduct,
  admin__deleteProduct,
  getALlProduct,
  getProduct,
  getReviews,
  createReview,
  deleteReview,
  admin__getProducts,
} = require("../controllers/productController");

router
  .route("/admin/product")
  .get(isAuthenticatedUser, authorisedRoles("admin"), admin__getProducts)
  .post(isAuthenticatedUser, authorisedRoles("admin"), admin__createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorisedRoles("admin"), admin__updateProduct)
  .delete(isAuthenticatedUser, authorisedRoles("admin"), admin__deleteProduct);
router.route("/product").get( getALlProduct);
router.route("/product/:id").get(isAuthenticatedUser, getProduct);
router
  .route("/review/:id")
  .get(isAuthenticatedUser, getReviews)
  .put(isAuthenticatedUser, createReview)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
