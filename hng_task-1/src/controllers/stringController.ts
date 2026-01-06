import { Request, Response } from "express";
import * as utils from "../utils";

import Strings from "../models/stringModel";

export const createString = async (req: Request, res: Response) => {
	if (!req.body.value) {
		res.status(400).json({
			message: "Invalid request body",
		});
		// } else if (req.body.value !== String) {
		// 	res.status(422).json({
		// 		message: "Invalid data type for value field (Must be string)",
		// 	});
	} else {
		const str: string = req.body.value;
		const analyzed_string = {
			id: utils.hash(str),
			value: str,
			properties: {
				length: str.length,
				is_palindrome: utils.isPalindrome(str),
				unique_characters: utils.uniqueCharacter(str),
				word_count: utils.wordCount(str),
				sha256_hash: utils.hash,
				character_frequency_map: utils.characterFrequencyMap(str),
				created_at: new Date().toISOString(),
			},
		};

		const string_analysis = await Strings.create(analyzed_string);

		res.status(200).json({
			status: "success",
			data: {
				string: string_analysis,
			},
		});
	}
};
