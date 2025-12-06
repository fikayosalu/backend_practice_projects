import express from "express";
import { Request, Response, NextFunction } from "express";
import * as fs from "fs";

const app = express();
const PORT = 3000;

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

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
	console.log("Hello from the middleware");
	next();
});

const tours: tourFrame[] = JSON.parse(
	fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, "utf-8")
);

const getAllTours = (req: Request, res: Response) => {
	res.status(200).json({
		status: "success",
		data: {
			tours,
		},
	});
};

const getARoute = (req: Request, res: Response) => {
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

const createATour = (req: Request, res: Response) => {
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

const updateARoute = (req: Request, res: Response) => {
	const id = Number(req.params.id);
	if (id > tours.length) {
		return res.status(404).json({
			status: "failed",
			message: "Invalid ID",
		});
	}
	return res.status(200).json({
		status: "success",
		data: {
			tour: "<Updated tour here>",
		},
	});
};

const deleteARoute = (req: Request, res: Response) => {
	const id = Number(req.params.id);
	if (id > tours.length) {
		return res.status(404).json({
			status: "failed",
			message: "Invalid ID",
		});
	}
	return res.status(204).json({
		status: "success",
		data: {
			tour: null,
		},
	});
};

app.route("/api/v1/tours").get(getAllTours).post(createATour);

app
	.route("/api/v1/tours/:id")
	.get(getARoute)
	.patch(updateARoute)
	.delete(deleteARoute);

app.listen(PORT, () => {
	console.log(`This app is listening on http://localhost:${PORT}`);
});
