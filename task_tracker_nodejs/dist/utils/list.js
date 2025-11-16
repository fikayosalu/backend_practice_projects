"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
This module contains a function that lists the tasks
according to its status
*/
const fs = require("fs");
const add_1 = require("./add");
const taskStatus = ["todo", "in-progress", "done"];
const listTasks = (status = null) => {
    // Check if file exists
    try {
        const data = JSON.parse(fs.readFileSync(add_1.path, "utf-8"));
        // If file exists, check if its empty
        if (data) {
            // If status argument is not specified return all tasks
            if (status === null)
                return data;
            for (let item of taskStatus) {
                // If status argument is specified check if its in the taskStatus array
                if (item === status) {
                    // If the status matches that in the array, list the task with that status
                    const list = data.filter((obj) => obj.status === status);
                    // If there is no match return not found message
                    if (list.length !== 0)
                        return list;
                    return `There is no task with status ${item}`;
                }
            }
        }
        return "Please add a task first";
    }
    catch (error) {
        return "Please add a task first";
    }
};
exports.default = listTasks;
