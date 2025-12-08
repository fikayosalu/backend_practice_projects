import * as fs from "fs";
import { Response, Request, NextFunction } from "express";

type tourFrame = {
	id: number;
	name: string;
	duration: number;
	maxGroupSize: number;
	difficulty: string;
	ratingsAverage: number;
	ratingsQuantity: number;
	price: number;
	summary: string;
	imageCover: string;
	images: string[];
	startDates: string[];
};

const tours: tourFrame[] = JSON.parse(
	fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, "utf-8")
);

export const checkId = (
	req: Request,
	res: Response,
	next: NextFunction,
	val: string
) => {
	if (Number(val) > tours.length) {
		return res.status(404).json({
			status: "failed",
			message: "Invalid ID",
		});
	}
	next();
	return;
};

export const getAllTours = (req: Request, res: Response) => {
	res.status(200).json({
		status: "success",
		data: {
			tours,
		},
	});
};

export const getARoute = (req: Request, res: Response) => {
	console.log(req.params);
	const id = Number(req.params.id);
	console.log(id);

	const tour = tours.find((obj) => {
		return obj.id === id;
	});
	if (tour) {
		res.status(200).json({
			status: "success",
			data: {
				tour,
			},
		});
	} else {
		res.status(404).json({
			status: "failed",
			message: "Invalid ID",
		});
	}
};

export const createATour = (req: Request, res: Response) => {
	// console.log(req.body);
	const newId = tours[tours.length - 1]!.id + 1;
	const newTour = { id: newId, ...req.body };
	tours.push(newTour);
	fs.writeFile(
		`${__dirname}/dev-data/data/tours-simple.json`,
		JSON.stringify(tours),
		(err) => {
			res.status(201).json({
				status: "success",
				data: {
					tour: newTour,
				},
			});
		}
	);
};

export const updateARoute = (req: Request, res: Response) => {
	return res.status(200).json({
		status: "success",
		data: {
			tour: "<Updated tour here>",
		},
	});
};

export const checkBody = (req: Request, res: Response, next: NextFunction) => {
	if (req.body.name && req.body.price) {
		next();
		return;
	} else {
		return res.status(400).json({
			status: "error",
			message: "Bad Request",
		});
	}
};

export const deleteARoute = (req: Request, res: Response) => {
	return res.status(204).json({
		status: "success",
		data: {
			tour: null,
		},
	});
};
