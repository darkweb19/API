const User = require("../models/model.user");

module.exports = async (req, res, next) => {
	if (req.user.role != "admin") {
		return res.status(403).json({
			success: false,
			message: "forbidden",
		});
	}

	const user = await User.findOneById(req.params.id);
	if (user.role == "admin") {
		return res.status(403).json({
			success: false,
			message: "forbidden",
		});
	}
	next();
};
