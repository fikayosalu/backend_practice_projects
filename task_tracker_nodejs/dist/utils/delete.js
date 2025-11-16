"use strict";
/*
This module contains a function that deletes
a task based on the id that the user specified
 */
Object.defineProperty(exports, "__esModule", { value: true });
const add_1 = require("./add");
const fs = require("fs");
const delete_task = (id) => {
    try {
        const data = fs.readFileSync(add_1.path, "utf-8");
        let list = JSON.parse(data);
        const count = list.length;
        list = list.filter((obj) => obj.id !== id);
        fs.writeFileSync(add_1.path, JSON.stringify(list));
        if (list.length < count)
            return "Deleted task successfully";
        return "Task not found";
    }
    catch (error) {
        return "Add a task please";
    }
};
exports.default = delete_task;
