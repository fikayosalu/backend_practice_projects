"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.path = void 0;
/*
This module contains a function that adds tasks
created by the user
 */
const fs = require("fs");
exports.path = "storage.json";
const add = (description) => {
    // A schema for the tasks
    const todo = {
        id: 0,
        description: description,
        status: "todo",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };
    try {
        fs.accessSync(exports.path);
        const data = JSON.parse(fs.readFileSync(exports.path, "utf-8"));
        if (data.length >= 1) {
            todo.id = data[data.length - 1].id + 1;
            data.push(todo);
        }
        else {
            todo.id = data.length + 1;
            data.push(todo);
        }
        fs.writeFileSync(exports.path, JSON.stringify(data));
        return "Task added successfully";
    }
    catch (error) {
        const data = [];
        todo.id = data.length + 1;
        data.push(todo);
        fs.writeFileSync(exports.path, JSON.stringify(data));
        return "Task added successfully";
    }
};
exports.default = add;
