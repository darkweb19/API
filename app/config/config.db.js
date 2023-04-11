const mongoose = require("mongoose");

function connectDb() {
	try {
		mongoose.connect("mongodb://localhost:27017/API");
		console.log("Database connected");
	} catch (err) {
		console.log(err.message);
	}
}
connectDb();
