const router = require("express").Router();
const isAdmin = require("../middlewares/middleware.isAdmin");
const hasPrivilage = require("../middlewares/middleware.hasPrivilage");

const userController = require("../controllers/controller.user");

router
	.route("/user")
	.get(isAdmin, userController.index)
	.post(userController.store);

router
	.route("/:id")
	.get(userController.show)
	.put(userController.update)
	.delete(hasPrivilage, userController.delete);

module.exports = router;
