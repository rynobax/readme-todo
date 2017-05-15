import fs = require('fs');
import path = require('path');

const findTodoList = (directory: string): string | null => {
    let cwd = directory;
    while(fs.statSync(cwd).isDirectory()){
        const files = fs.readdirSync(cwd).map(e => e.toLowerCase());

        const todoList = getTodoList(files, cwd);
        if(todoList != null){
            return todoList;
        }

        if(atProjectRoot(files)){
            return null;
        }

        cwd = path.join(cwd, '..');
    }
    return null;
};

function getTodoList(files: string[], cwd: string): string | null{
const validNames = ['readme.md'];
const possibilities = files.filter(x => validNames.some(y => x==y));
for(const fileName of possibilities){
    const filePath = path.join(cwd, fileName);
    const content = fs.readFileSync(filePath).toString().toLowerCase();
    if(content.includes('todo')){
        return path.join(cwd, fileName);
    }
};
return null;
}

function atProjectRoot(files: string[]): boolean{
const rootFiles = ['.git', 'package.json', 'readme.md', 'todo.md', 'liscense', 'readme'];
return files.some(x => rootFiles.some((y) => x == y));
}

export {findTodoList};