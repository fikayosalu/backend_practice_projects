import * as readline from "readline";
import add from "./utils/add";

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
		} else {
			console.log(`${input}: '${input}' is not a command`);
		}

		askUser();
	});
}

askUser();
