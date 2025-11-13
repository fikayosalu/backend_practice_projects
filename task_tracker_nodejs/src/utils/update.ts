/*
 This module contains the update function used to update
 description of already existing tasks
 */
import * as fs from "fs";
import { path } from "./add";

const update = (id: number, description: string) => {
	// Read the task file to get the existing tasks
	fs.readFile(path, "utf-8", (err, data) => {
		// If file does not exist throw an error
		if (err) {
			console.log("\nYou do not have a todo list, add one first");
		} else {
			// If file does exist, get the tasks list
			const list = JSON.parse(data);
			// Check is list is defined and id is in list range
			if (list && id > 0 && id <= list.length) {
				// Change the description using id to get the index
				list[id - 1].description = description;
				list[id - 1].updated_at = new Date().toISOString();
				// Write updated list back to file
				fs.writeFile(path, `${JSON.stringify(list)}`, (err) => {});
			} else {
				console.log("\nTask not found");
			}
		}
	});
};

export default update;
