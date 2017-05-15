"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const findTodoLocation = (directory) => {
    let cwd = directory;
    while (fs.statSync(cwd).isDirectory()) {
        const files = fs.readdirSync(cwd);
        const todoFilePath = validTodoFilePath(files, cwd);
        if (todoFilePath != null) {
            return todoFilePath;
        }
        if (atProjectRoot(files)) {
            return null;
        }
    }
    return null;
};
exports.findTodoLocation = findTodoLocation;
function validTodoFilePath(files, cwd) {
    const validNames = ['readme.md', 'todo.md'];
    const possibilities = files.filter(x => validNames.some(y => x == y));
    possibilities.forEach((fileName) => {
        if (fileName == 'todo.md')
            return fileName;
        const filePath = path.join(cwd, fileName);
        const content = fs.readFileSync(filePath).toString().toLowerCase();
    });
    return null;
}
function atProjectRoot(files) {
    const rootFiles = ['.git', 'package.json', 'readme.md', 'todo.md', 'liscense', 'readme'];
    return files.some(x => rootFiles.some((y) => x == y));
}
