const router = require("express").Router();

const userController = require("../controllers/controller.user");

router.route("/user").get(userController.index).post(userController.store);

router
	.route("/:id")
	.get(userController.show)
	.put(userController.update)
	.delete(userController.delete);

module.exports = router;
