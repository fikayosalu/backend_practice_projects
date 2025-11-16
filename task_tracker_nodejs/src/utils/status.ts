/*
This module contains a function that changes the status 
of a task
 */
import { path, task } from "./add";
import * as fs from "fs";

const changeStatus = (status: string, id: number): string => {
	// Check if the storage file exists
	try {
		// Retrieve contents of file if it exists
		const data = JSON.parse(fs.readFileSync(path, "utf-8"));

		// Retrieve index of the specified task using id argument
		const index = data.findIndex((obj: task) => obj.id === id);

		// If task is not found
		if (index === -1) return "Task not found";

		// If task is found, update the status with the specified status argument
		data[index].status = status;
		fs.writeFileSync(path, JSON.stringify(data));
		return "Status changed successfully";
	} catch (error) {
		// If file does not exist, tell the user to add a task
		return "Add a task";
	}
};

export default changeStatus;
