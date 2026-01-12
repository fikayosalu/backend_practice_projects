import { Request, Response } from "express";
import * as utils from "../utils";

import Strings from "../models/stringModel";

export const createString = async (req: Request, res: Response) => {
	/* This method analyzes a string and saves it to the database */

	if (!req.body.value) {
		/* If no request body was provided, return 400 bad request error */
		res.status(400).json({
			message: "Invalid request body",
		});
	} else {
		/* If request body was provided, 
		check if the string exists in the database */
		const str_to_analyze: string = req.body.value;
		const existingString = await Strings.exists({ value: str_to_analyze });

		if (!existingString) {
			/* If the string does not exist, create it in the database */
			const analyzed_string = {
				id: utils.hash(str_to_analyze),
				value: str_to_analyze,
				properties: {
					length: str_to_analyze.length,
					is_palindrome: utils.isPalindrome(str_to_analyze),
					unique_characters: utils.uniqueCharacter(str_to_analyze),
					word_count: utils.wordCount(str_to_analyze),
					sha256_hash: utils.hash,
					character_frequency_map: utils.characterFrequencyMap(str_to_analyze),
				},
				created_at: new Date().toISOString(),
			};

			const string_analysis = await Strings.create(analyzed_string);

			res.status(201).json({
				status: "success",
				data: {
					string: string_analysis,
				},
			});
		} else {
			/* I the string already exists, return a 409 error */
			res.status(409).json({
				message: "String already exists in the system",
			});
		}
	}
};

export const getString = async (req: Request, res: Response) => {
	/* This method returns a specific string */

	const str_param = req.params.string;
	console.log(str_param);

	if (str_param) {
		/* If str-param is defined, query the database for the string
		 remove "__v" and "_id" parameters from the result of the query
		 if it exists */
		const analyzed_string = await Strings.findOne({ value: str_param }).select(
			"-__v -_id"
		);
		console.log(analyzed_string);

		if (analyzed_string) {
			/* If the result exists return it */
			res.status(200).json({
				data: analyzed_string,
			});
		} else {
			/* If the result does not exist, return a 404 not found error */
			res.status(404).json({
				message: "String does not exist in the system",
			});
		}
	} else {
		/* If the str_param is not defined, return a 400 bad request error */
		res.status(400).json({
			message: "Invalid string provided",
		});
	}
};

export const getAllString = async (req: Request, res: Response) => {
	let query = Strings.find();

	if (req.query.is_palindrome) {
		const is_palindrome = req.query.is_palindrome === "true";
		query = query.find({
			"properties.is_palindrome": is_palindrome,
		});
	}

	if (req.query.min_length) {
		try {
			const min_length = Number(req.query.min_length);
			query = query.find({ "properties.length": { $gt: min_length } });
		} catch (error) {
			return res.status(400).json({
				message: "min_length must be a number",
			});
		}
	}

	if (req.query.max_length) {
		try {
			const max_length = Number(req.query.max_length);
			query = query.find({ "properties.length": { $lt: max_length } });
		} catch (error) {
			return res.status(400).json({
				message: "max_length must be a number",
			});
		}
	}
	if (req.query.word_count) {
		try {
			const word_count = Number(req.query.word_count);
			query = query.find({ "properties.word_count": word_count });
		} catch (error) {
			return res.status(400).json({
				message: "word_count must be a number",
			});
		}
	}

	if (req.query.contains_character) {
		query = query.find({
			value: { $regex: req.query.contains_character as string },
		});
	}

	const data = await query;

	res.status(200).json({
		data,
		count: data.length,
		filters_applied: req.query,
	});
};

export const deleteString = async (req: Request, res: Response) => {
	if (req.params.string) {
		try {
			const removed = await Strings.deleteOne({ value: req.params.string });
			if (removed.deletedCount === 0) throw new Error();

			res.status(204).json();
		} catch (error) {
			res.status(400).json({
				message: "String not found",
			});
		}
	}
};
