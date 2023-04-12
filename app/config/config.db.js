const mongoose = require("mongoose");
require("dotenv").config();

function connectDb() {
	try {
		mongoose.connect(process.env.DATABASE_URL);
		console.log("Database connected");
	} catch (err) {
		console.log(err.message);
	}
}
connectDb();
