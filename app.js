const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

// the standard, obtain methods from express, stored in app
const app = express();

if (process.env.NODE_ENV === "development") {
	// display the request information in the console
	app.use(morgan("dev"));
}
// express.json is the middleware
// it will modify the incoming request data
app.use(express.json());

// our own middleware
app.use((req, res, next) => {
	console.log("middleware..............");
	next();
});

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
