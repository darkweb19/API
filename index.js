const express = require("express");
const app = express();
app.use(express.json());
//database
require("./app/config/config.db");
//routes
app.use(require("./app/routes/route.user"));
app.use(require("./app/routes/route.auth"));

//server listens at
app.listen(4000, () => {
	console.log("Server started at port");
});
