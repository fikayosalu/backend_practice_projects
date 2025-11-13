import { path } from "./add";
import * as fs from "fs";

type task = {
	id: number;
	description: string;
	status: string;
	created_at: string;
	updated_at: string;
};

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
