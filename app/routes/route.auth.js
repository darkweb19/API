const router = require("express").Router();
const authController = require("../controllers/controller.auth");

router.route("/login").post(authController.login);

module.exports = router;
