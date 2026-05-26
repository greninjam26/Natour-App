const fs = require("fs");
const express = require("express");

// the standard, obtain methods from express, stored in app
const app = express();

// express.json is the middleware
// it will modify the incoming request data
app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// get requests for all the tours
app.get(
	"/api/v1/tours",
	// this function is usually called the route handler
	(req, res) => {
		res.status(200).json({
			status: "success",
			result: tours.length,
			data: { tours },
		});
	},
);

// get request for only one tour
app.get(
	"/api/v1/tours/:id",
	// this function is usually called the route handler
	(req, res) => {
		console.log(req.params.id * 1);
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
	},
);

// post request for adding new tours
app.post("/api/v1/tours", (req, res) => {
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
});

const port = 3000;
// start a server
app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});
