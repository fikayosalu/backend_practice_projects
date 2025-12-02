import express from "express";
import { Request, Response } from "express";
import * as fs from "fs";

const app = express();
const PORT = 3000;

app.use(express.json());

const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, "utf-8")
);

// app.get("/", (req: Request, res: Response) => {
// 	res
// 		.status(200)
// 		.json({ message: "Hello from the server side!", app: "Natours" });
// });

// app.post("/", (req: Request, res: Response) => {
// 	res.send("You can post this endpoint...");
// });

app.get("/api/v1/tours", (req: Request, res: Response) => {
	res.status(200).json({
		status: "success",
		data: {
			tours,
		},
	});
});

app.post("/api/v1/tours", (req: Request, res: Response) => {
	// console.log(req.body);
	const newId = tours[tours.length - 1].id + 1;
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
});

app.listen(PORT, () => {
	console.log(`This app is listening on http://localhost:${PORT}`);
});
