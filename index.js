const express = require("express");
const app = express();
app.use(express.json());

//database
require("./app/config/config.db");

//routes
app.use(require("./app/routes/route.auth"));
app.use(require("./app/middlewares/middleware.jwt"));
app.use(require("./app/routes/route.user"));

//server listens at
app.listen(3000, () => {
	console.log("Server started at port");
});
