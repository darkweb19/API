const User = require("../models/model.user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email });
		const isValid = await bcrypt.compare(password, user.password);

		if (!user || !isValid) {
			res.status(401).json({
				success: false,
				error: "Invalid credentials",
			});
		} else {
			const payload = {
				sub: user._id,
				email: user.email,
				name: user.name,
				iat: Date.now(),
			};

			// const access_token_secret = "1234";
			// const refresh_token_secret = "4321";

			res.status(200).json({
				success: true,
				message: "user logged in successfully",
				data: {
					user,
					access_token: jwt.sign(
						payload,
						process.env.ACCESS_TOKEN_SECRET,
						{
							expiresIn: "1h",
						}
					),
					refresh_token: jwt.sign(
						payload,
						process.env.REFRESH_TOKEN_SECRET,
						{
							expiresIn: "1d",
						}
					),
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

exports.refreshToken = (req, res) => {
	const token = req.body;

	//verify the token
	try {
		jwt.verify(
			token.token,
			process.env.REFRESH_TOKEN_SECRET,
			async (err, decoded) => {
				if (err) {
					return res.status(401).json({
						success: false,
						error: "Unauthorized",
					});
				} else {
					const payload = {
						sub: decoded.sub,
						email: decoded.email,
						name: decoded.name,
					};
					return res.status(200).json({
						success: true,
						access_token: jwt.sign(
							payload,
							process.env.ACCESS_TOKEN_SECRET,
							{ expiresIn: "1h" }
						),
					});
				}
			}
		);
	} catch (err) {
		res.status(500).json({
			success: false,
			error: "Server Error",
			message: err.message,
		});
	}
};
