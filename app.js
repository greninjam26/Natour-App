const fs = require("fs");
const express = require("express");

// the standard, obtain methods from express, stored in app
const app = express();

// express.json is the middleware
// it will modify the incoming request data
app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

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
