const router = require("express").Router();

const {
  createUser,
  loginUser,
  forgetPassword,
  logoutUser,
  resetPassword,
  getMyProfile,
  updateMyProfile,
  admin__getAllUsers,
  admin__getUser,
  admin__updateUser,
  admin__deleteUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorisedRoles } = require("../middlewares/auth");

router.route("/user").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").get(isAuthenticatedUser, logoutUser);
router.route("/reset/password").get(isAuthenticatedUser, forgetPassword);
router.route("/reset/password/:token").put(isAuthenticatedUser, resetPassword);
router
  .route("/me")
  .get(isAuthenticatedUser, getMyProfile)
  .put(isAuthenticatedUser, updateMyProfile);
router
  .route("/admin/user")
  .get(isAuthenticatedUser, authorisedRoles("admin"), admin__getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorisedRoles("admin"), admin__getUser)
  .put(isAuthenticatedUser, authorisedRoles("admin"), admin__updateUser)
  .delete(isAuthenticatedUser, authorisedRoles("admin"), admin__deleteUser);
module.exports = router;
