/*
This module contains a function that deletes
a task based on the id that the user specified
 */

import { path, task } from "./add";
import * as fs from "fs";

const delete_task = (id: number): string => {
	try {
		const data = fs.readFileSync(path, "utf-8");
		let list = JSON.parse(data);
		const count = list.length;
		list = list.filter((obj: task) => obj.id !== id);
		fs.writeFileSync(path, JSON.stringify(list));
		if (list.length < count) return "Deleted task successfully";
		return "Task not found";
	} catch (error) {
		return "Add a task please";
	}
};

export default delete_task;
