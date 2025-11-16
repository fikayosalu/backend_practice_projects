"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
This module contains a function that changes the status
of a task
 */
const add_1 = require("./add");
const fs = require("fs");
const changeStatus = (status, id) => {
    // Check if the storage file exists
    try {
        // Retrieve contents of file if it exists
        const data = JSON.parse(fs.readFileSync(add_1.path, "utf-8"));
        // Retrieve index of the specified task using id argument
        const index = data.findIndex((obj) => obj.id === id);
        // If task is not found
        if (index === -1)
            return "Task not found";
        // If task is found, update the status with the specified status argument
        data[index].status = status;
        fs.writeFileSync(add_1.path, JSON.stringify(data));
        return "Status changed successfully";
    }
    catch (error) {
        // If file does not exist, tell the user to add a task
        return "Add a task";
    }
};
exports.default = changeStatus;
