const User = require("../models/model.user");

exports.index = async (req, res) => {
	try {
		const users = await User.find();

		res.status(200).json({
			success: true,
			data: {
				users,
			},
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			error: "Server Error",
			message: err.message,
		});
	}
};

exports.store = async (req, res) => {
	try {
		const user = new User(req.body);
		await user.save();
		res.status(200).json({
			success: true,
			message: "User added successfully",
			data: {
				user,
			},
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			error: "Server Error",
			message: err.message,
		});
	}
};

exports.show = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		} else {
			res.status(200).json({
				success: true,

				data: {
					user,
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
exports.update = async (req, res) => {
	//update
	try {
		const user = await User.findOneAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!user) {
			return res.status(404).json({
				success: false,
				error: "USer not found",
			});
		} else {
			return res.status(200).json({
				success: true,
				message: "user updated successfully",
				data: {
					user,
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

exports.delete = async (req, res) => {
	//delete user
	try {
		const user = await User.findOneAndDelete(req.params.id);
		if (!user) {
			return res.status(404).json({
				success: false,
				error: "User not found",
			});
		} else {
			res.status(200).json({
				success: true,
				message: "User deleted successfully",
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
