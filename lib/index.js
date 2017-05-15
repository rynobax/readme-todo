"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// readme-todo-cli
const parse_1 = require("./parse");
const message_1 = require("./message");
const todo_1 = require("./todo");
let start = 1;
if (process.argv[0] == 'node')
    start++;
const args = process.argv.slice(start);
const action = parse_1.parse(args);
const todoLocation = todo_1.findTodoLocation(__dirname);
console.log(todoLocation);
const message = message_1.getMessage(action, todoLocation);
console.log(message);
