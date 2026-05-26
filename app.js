const fs = require("fs");
const express = require("express");
const morgan = require("morgan");

// the standard, obtain methods from express, stored in app
const app = express();

// display the request information in the console
app.use(morgan("dev"));
// express.json is the middleware
// it will modify the incoming request data
app.use(express.json());

// our own middleware
app.use((req, res, next) => {
	console.log("middleware..............");
	next();
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// this function is usually called the route handler
const getAllTours = (req, res) => {
	res.status(200).json({
		status: "success",
		result: tours.length,
		data: { tours },
	});
};

const getTour = (req, res) => {
	const id = req.params.id * 1;

	// if the arrow function have a {} we need to have return
	// const tour = tours.find(t => {
	// 	if (t.id === req.params.id * 1) {
	// 		return t;
	// 	}
	// });
	const tour = tours.find(t => t.id === id);

	if (!tour) {
		return res.status(404).json({
			status: "fail",
			message: "Invaild ID",
		});
	}

	res.status(200).json({
		status: "success",
		data: { tour },
	});
};

const createTour = (req, res) => {
	const newId = tours[tours.length - 1].id + 1;
	const newTour = Object.assign({ id: newId }, req.body);

	tours.push(newTour);

	fs.writeFile(
		`${__dirname}/dev-data/data/tours-simple.json`,
		JSON.stringify(tours),
		error => {
			res.status(201).json({ status: "success", data: { tour: newTour } });
		},
	);
};

const updateTour = (req, res) => {};
const deleteTour = (req, res) => {};

const getAllUsers = (req, res) => {
	res.status(500).json({ status: "error", message: "the route is not implemented" });
};

const createUser = (req, res) => {
	res.status(500).json({ status: "error", message: "the route is not implemented" });
};

const getUser = (req, res) => {
	res.status(500).json({ status: "error", message: "the route is not implemented" });
};

const updateUser = (req, res) => {
	res.status(500).json({ status: "error", message: "the route is not implemented" });
};

const deleteUser = (req, res) => {
	res.status(500).json({ status: "error", message: "the route is not implemented" });
};

// // get requests for all the tours
// app.get("/api/v1/tours", getAllTours);
// // post request for adding new tours
// app.post("/api/v1/tours", createTour);
// // get request for only one tour
// app.get("/api/v1/tours/:id", getTour);
// // patch requests for updating tours
// app.patch("api/v1/tours/:id", updateTour);
// // delete request for deleting tours
// app.delete("api/v1/tours/:id", deleteTour);

app.route("/api/v1/tours").get(getAllTours).post(createTour);
app.route("/api/v1/tours/:id").get(getTour).patch(updateTour).delete(deleteTour);

app.route("/api/v1/users").get(getAllUsers).post(createUser);
app.route("/api/v1/users/:id").get(getUser).patch(updateUser).delete(deleteUser);

const port = 3000;
// start a server
app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});
