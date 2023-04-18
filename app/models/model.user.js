const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { urlencoded } = require("express");
const userSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: { type: String, enum: ["admin", "user"], default: "user" },
	},
	{
		toJSON: { virtuals: true },
	}
);

//virtual
userSchema.virtual("fullname").get(function () {
	return this.firstName + " " + this.lastName;
});

//hashing the password before saving into database
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	this.password = await bcrypt.hash(this.password, 10);
	next();
});
//sending mail to user
userSchema.post("save", async function (next) {
	//send mail to user
});

//query to search by first name
userSchema.query.byFirstName = function (name) {
	return this.where({ firstName: new RegExp(name, "i") });
};

module.exports = mongoose.model("User", userSchema);
