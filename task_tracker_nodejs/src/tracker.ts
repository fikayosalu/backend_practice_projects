import * as readline from "readline";
import add from "./utils/add";
import update from "./utils/update";
import delete_task from "./utils/delete";

// Set up read line to get user inputs
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
		} else if (inputCommand[0] === "update") {
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
						update(id, words);
						console.log("Update successful");
					}
				} catch (e) {
					const error = e as Error;
					console.log(error.message);
				}
			} else {
				console.log("A description is need for an update");
			}
		} else if (inputCommand[0] === "delete") {
			if (inputCommand[1]) {
				try {
					let id = Number(inputCommand[1]);
					if (isNaN(id)) {
						throw new Error("Specified id must be an integer");
					}
					delete_task(id);
					console.log("Deleted Successfully");
				} catch (error) {
					const e = error as Error;
					console.log(e.message);
				}
			} else {
				console.log("Please specify an id to be deleted");
			}
		} else {
			console.log(`${input}: '${input}' is not a command`);
		}

		askUser();
	});
}

askUser();
