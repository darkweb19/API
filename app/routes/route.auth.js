const router = require("express").Router();
const authController = require("../controllers/controller.auth");

router.route("/auth/login").post(authController.login);
router.route("/auth/refresh-token").post(authController.refreshToken);

module.exports = router;
