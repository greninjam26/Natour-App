// const fs = require("fs");
const Tour = require("../models/tourModel");

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

// exports.checkID = (req, res, next, val) => {
//   if (req.params.id * 1 > tours.length) {
//     // we have to have this return, to make sure the next() is not ran
//     return res.status(404).json({
//       status: "fail",
//       message: "Invaild ID",
//     });
//   }
//   next();
// };

// this function is usually called the route handler
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    // result: tours.length,
    // data: { tours },
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
  // const tour = tours.find((t) => t.id === id);

  res.status(200).json({
    status: "success",
    // data: { tour },
  });
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({ status: "success", data: { tour: newTour } });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err });
  }
};

exports.updateTour = (req, res) => {};
exports.deleteTour = (req, res) => {};
