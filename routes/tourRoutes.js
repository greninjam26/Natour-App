const express = require("express");
const tourController = require("../controllers/tourController");

const router = express.Router();

// router.param("id", tourController.checkID);

router
  .route("/top-5-cheap")
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route("/tour-stats").get(tourController.getTourStats);

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
router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
