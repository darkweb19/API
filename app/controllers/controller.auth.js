const User = require("../models/model.user");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email: email });

		if (!user || user.password != password) {
			res.status(401).json({
				success: false,
				error: "Invalid credentials",
			});
		} else {
			const payload = {
				user_id: user._id,
				email: user.email,
				name: user.name,
			};

			const access_token_secret = "1234";
			const refresh_token_secret = "4321";

			res.status(200).json({
				success: true,
				message: "user logged in successfully",
				data: {
					user,
					access_token: jwt.sign(payload, access_token_secret, {
						expiresIn: "1h",
					}),
					refresh_token: jwt.sign(payload, refresh_token_secret, {
						expiresIn: "1d",
					}),
				},
			});
		}
	} catch (err) {
		res.status(500).json({
			success: false,
			error: "Server Error",
			message: err.message,
		});
	}
};
