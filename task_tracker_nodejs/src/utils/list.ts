import * as fs from "fs";
import { path } from "./add";

type task = {
	id: number;
	description: string;
	status: string;
	created_at: string;
	updated_at: string;
};

const taskStatus = ["todo", "in-progress", "done"];

const listTasks = (status: string | null = null): string | task[] => {
	try {
		const data = JSON.parse(fs.readFileSync(path, "utf-8"));
		if (data) {
			if (status === null) return data;
			for (let item of taskStatus) {
				if (item === status) {
					const list = data.filter((obj: task) => obj.status === status);
					if (list.length !== 0) return list;
					return `There is no task with status ${item}`;
				}
			}
		}
		return "Please add a task first";
	} catch (error) {
		return "Please add a task first";
	}
};

export default listTasks;
