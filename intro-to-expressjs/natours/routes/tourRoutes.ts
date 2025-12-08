import express, { NextFunction, Response, Request } from "express";
import * as tourController from "../controllers/tourController";
export const router = express.Router();

router.param("id", tourController.checkId);

router
	.route("/")
	.get(tourController.getAllTours)
	.post(tourController.checkBody, tourController.createATour);

router
	.route("/:id")
	.get(tourController.getARoute)
	.patch(tourController.updateARoute)
	.delete(tourController.deleteARoute);
