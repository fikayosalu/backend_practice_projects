import express, { NextFunction, Response, Request } from "express";
import * as tourController from "../controllers/tourController";
const tourRouter = express.Router();

// tourRouter.param("id", tourController.checkId);

tourRouter
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createATour);

tourRouter
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateARoute)
  .delete(tourController.deleteARoute);

export default tourRouter;
