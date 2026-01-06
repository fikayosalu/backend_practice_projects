import { Request, Response } from "express";
import * as utils from "../utils";

const createString = async (req: Request, res: Response) => {
	if (!req.body.value) {
		res.status(400).json({
			message: "Invalid request body",
		});
	} else {
		const str: string = req.body.value;
	}
};
