import * as fs from "fs";

export const path = "storage.json";

const add = (description: string) => {
	// A schema for the tasks
	type task = {
		id: number;
		description: string;
		status: string;
		created_at: string;
		updated_at: string;
	};

	// Check if the file exists
	fs.access(path, (err) => {
		const todo: task = {
			id: 0,
			description: description,
			status: "todo",
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		};

		// If the file does not exist, create a new list of todos add the current todo then save it to the file
		if (err) {
			const tasks: task[] = [];
			todo.id = tasks.length + 1;
			tasks.push(todo);
			fs.writeFile(path, JSON.stringify(tasks), (err) => {
				console.log(err);
			});
		} else {
			// if the file exists, get the todo list in the file, add the current todo then save the list to the file
			fs.readFile(path, "utf-8", (err, data) => {
				const all: task[] = JSON.parse(data);
				todo.id = all.length + 1;
				all.push(todo);
				fs.writeFile(path, JSON.stringify(all), (err) => {});
			});
		}
	});
};

export default add;
