"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
const add_1 = require("./utils/add");
const update_1 = require("./utils/update");
const delete_1 = require("./utils/delete");
const status_1 = require("./utils/status");
const list_1 = require("./utils/list");
// Set up read line to get user inputs
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function progress(status, input) {
    if (input.length === 2) {
        try {
            const id = Number(input[1]);
            if (isNaN(id)) {
                throw new Error("Task id my be an integer");
            }
            else {
                const output = (0, status_1.default)(status, id);
                console.log(output);
            }
        }
        catch (error) {
            const e = error;
            console.log(e.message);
        }
    }
    else {
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
        const inputCommand = input.trim().split(" ");
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
                    (0, add_1.default)(words);
                    console.log("Task successfully added");
                }
                else {
                    // If the user does not put a description
                    console.log("add: 'add' command needs a description");
                }
                break;
            case "update":
                let id;
                if (inputCommand.length > 2) {
                    let words = "";
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
                        }
                        else {
                            const output = (0, update_1.default)(id, words);
                            console.log(output);
                        }
                    }
                    catch (e) {
                        const error = e;
                        console.log(error.message);
                    }
                }
                else {
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
                        const output = (0, delete_1.default)(id);
                        console.log(output);
                    }
                    catch (error) {
                        const e = error;
                        console.log(e.message);
                    }
                }
                else {
                    console.log("Please specify an id to be deleted");
                }
                break;
            case "mark-in-progress":
                progress("in-progress", inputCommand);
                break;
            case "mark-done":
                progress("done", inputCommand);
                break;
            case "list":
                if (inputCommand.length === 2) {
                    const output = (0, list_1.default)(inputCommand[1]);
                    console.log(output);
                }
                else if (inputCommand.length === 1) {
                    const output = (0, list_1.default)();
                    console.log(output);
                }
                else {
                    console.log("list expects at most 1 argument or null");
                }
                break;
            default:
                console.log(`${input}: '${input}' is not a command`);
                break;
        }
        askUser();
    });
}
askUser();
