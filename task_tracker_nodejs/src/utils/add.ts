import * as fs from "fs";

export const path = "storage.json";

const add = (description: string): string => {
	// A schema for the tasks
	type task = {
		id: number;
		description: string;
		status: string;
		created_at: string;
		updated_at: string;
	};

	const todo: task = {
		id: 0,
		description: description,
		status: "todo",
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	};

	try {
		fs.accessSync(path);
		const data = JSON.parse(fs.readFileSync(path, "utf-8"));
		if (data.length >= 1) {
			todo.id = data[data.length - 1].id + 1;
			data.push(todo);
		} else {
			todo.id = data.length + 1;
			data.push(todo);
		}
		fs.writeFileSync(path, JSON.stringify(data));
		return "Task added successfully";
	} catch (error) {
		const data: task[] = [];
		todo.id = data.length + 1;
		data.push(todo);
		fs.writeFileSync(path, JSON.stringify(data));
		return "Task added successfully";
	}
};

export default add;
