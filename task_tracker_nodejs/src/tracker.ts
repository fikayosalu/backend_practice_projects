import * as fs from "fs";
import * as readline from "readline";

const path = "storage.json";

const add = (description: string) => {
	// A schema for the tasks
	type task = {
		id: number;
		description: string;
		status: string;
		created_at: number;
		updated_at: number;
	};

	// Check if the file exists
	fs.access(path, (err) => {
		const todo: task = {
			id: 0,
			description: description,
			status: "todo",
			created_at: Date.now(),
			updated_at: Date.now(),
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

// while (true) {
// 	const rl = readline.createInterface({
// 		input: process.stdin,
// 		output: process.stdout,
// 	});

// 	// Ask the user a question
// 	rl.question("task-cli$ ", (command) => {
// 		console.log(command.split(" "));
// 		rl.close(); // close the interface
// 	});
// }

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

function askUser() {
	// This function handles the user inputs recursively
	rl.question("task-cli$ ", (input) => {
		// Exit the command line interface
		if (input === "exit") {
			rl.close();
			process.exit();
		}

		// take user input and split words into and array to get the commands
		const inputCommand: string[] = input.trim().split(" ");
		if (inputCommand[0] === "add") {
			if (inputCommand.length >= 2) {
				let words = "";
				//Join the words after the command to form a task sentence
				for (let i = 1; i < inputCommand.length; i++) {
					words += `${inputCommand[i]} `;
				}
				add(words);
				console.log("Task successfully added");
			} else {
				// If the user does not put a description
				console.log("add: 'add' command needs a description");
			}
		} else {
			console.log(`${input}: '${input}' is not a command`);
		}

		askUser();
	});
}

askUser();
