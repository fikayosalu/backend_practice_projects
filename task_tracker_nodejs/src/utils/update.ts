/*
 This module contains the update function used to update
 description of already existing tasks
 */
import * as fs from "fs";
import { path, task } from "./add";

const update = (id: number, description: string): string => {
	// Check if the storage file exists
	try {
		const data = JSON.parse(fs.readFileSync(path, "utf-8"));
		// If file exists check if its empty
		if (data) {
			// Find the index of the task to be updated
			const index = data.findIndex((obj: task) => obj.id === id);
			// If task does not exist
			if (index === -1) return "Task not found";

			// if task exists updated it
			data[index].description = description;
			fs.writeFileSync(path, JSON.stringify(data));
			return "Task updated successfully";
		}
		// If file is empty
		return "Add a task";

		// If file does not exist, tell user to add a task
	} catch (error) {
		return "Add a task";
	}
};

export default update;
