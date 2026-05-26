const fs = require("fs");

const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

// this function is usually called the route handler
exports.getAllTours = (req, res) => {
	res.status(200).json({
		status: "success",
		result: tours.length,
		data: { tours },
	});
};

exports.getTour = (req, res) => {
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

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {};
exports.deleteTour = (req, res) => {};
