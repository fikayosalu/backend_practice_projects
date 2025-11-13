import * as readline from "readline";
import add from "./utils/add";
import update from "./utils/update";
import delete_task from "./utils/delete";
import changeStatus from "./utils/status";

// Set up read line to get user inputs
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

function progress(status: string, input: string[]) {
	if (input.length === 2) {
		try {
			const id = Number(input[1]);
			if (isNaN(id)) {
				throw new Error("Task id my be an integer");
			} else {
				const output = changeStatus(status, id);
				console.log(output);
			}
		} catch (error) {
			const e = error as Error;
			console.log(e.message);
		}
	} else {
		console.log("Only 2 arguments are required: {command} {task id}");
	}
}

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

		switch (inputCommand[0]) {
			case "add":
				if (inputCommand.length >= 2) {
					let words = "";
					//Join the words after the command to form a task sentence
					for (let i = 1; i < inputCommand.length; i++) {
						words +=
							i !== inputCommand.length - 1
								? `${inputCommand[i]} `
								: `${inputCommand[i]}`;
					}
					add(words);
					console.log("Task successfully added");
				} else {
					// If the user does not put a description
					console.log("add: 'add' command needs a description");
				}
				break;

			case "update":
				let id: number;

				if (inputCommand.length > 2) {
					let words: string = "";
					for (let i = 2; i < inputCommand.length; i++) {
						words +=
							i !== inputCommand.length - 1
								? `${inputCommand[i]} `
								: `${inputCommand[i]}`;
					}
					try {
						id = Number(inputCommand[1]);
						if (isNaN(id)) {
							throw new Error("Task must have an id integer");
						} else {
							const output = update(id, words);
							console.log(output);
						}
					} catch (e) {
						const error = e as Error;
						console.log(error.message);
					}
				} else {
					console.log("A description is need for an update");
				}
				break;

			case "delete":
				if (inputCommand[1]) {
					try {
						let id = Number(inputCommand[1]);
						if (isNaN(id)) {
							throw new Error("Specified id must be an integer");
						}
						const output = delete_task(id);
						console.log(output);
					} catch (error) {
						const e = error as Error;
						console.log(e.message);
					}
				} else {
					console.log("Please specify an id to be deleted");
				}
				break;

			case "mark-in-progress":
				progress("in-progress", inputCommand);
				break;

			case "mark-done":
				progress("done", inputCommand);
				break;

			default:
				console.log(`${input}: '${input}' is not a command`);
				break;
		}

		askUser();
	});
}

askUser();
