const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/model.user");

//token
module.exports = (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		return res.status(401).json({
			success: false,
			error: "Unauthorized",
		});
	}

	//if valid token for the

	try {
		jwt.verify(
			token,
			process.env.ACCESS_TOKEN_SECRET,
			async (err, decoded) => {
				if (err) {
					return res.status(401).json({
						success: false,
						error: "Unauthorized",
					});
				} else {
					const user = await User.findById(decoded.sub).select(
						"-password"
					);
					req.user = user;
					next();
				}
			}
		);
	} catch (err) {
		return res.status(401).json({
			success: false,
			error: "Unauthorized",
		});
	}
};
