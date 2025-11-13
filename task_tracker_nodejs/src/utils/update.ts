/*
 This module contains the update function used to update
 description of already existing tasks
 */
import * as fs from "fs";
import { path } from "./add";

type task = {
	id: number;
	description: string;
	status: string;
	created_at: string;
	updated_at: string;
};

const update = (id: number, description: string): string => {
	try {
		const data = JSON.parse(fs.readFileSync(path, "utf-8"));
		if (data) {
			const index = data.findIndex((obj: task) => obj.id === id);
			if (index === -1) return "Task not found";
			data[index].description = description;
			fs.writeFileSync(path, JSON.stringify(data));
			return "Task updated successfully";
		}
		return "Add a task";
	} catch (error) {
		return "Add a task";
	}
};

export default update;
