import fs = require('fs');
import path = require('path');

const findTodoLocation = (directory: string): string | null => {
    let cwd = directory;
    while(fs.statSync(cwd).isDirectory()){
        const files = fs.readdirSync(cwd);

        if(atProjectRoot(files)){
            return null;
        }

        const todoFilePath = validTodoFilePath(files, cwd);
        if(todoFilePath != null){
            return todoFilePath;
        }
    }
    return null;
}

function validTodoFilePath(files: string[], cwd: string): string | null{
    const validNames = ['readme.md', 'todo.md'];
    const possibilities = files.filter(x => validNames.some(y => x==y));
    possibilities.forEach((fileName) => {
        if(fileName == 'todo.md') return fileName;
        const filePath = path.join(cwd, fileName);
        const content = fs.readFileSync(filePath).toString().toLowerCase();
        
    });
    return null;
}

function atProjectRoot(files: string[]): boolean{
    // To avoid recursing back through the entire file system
    // Returns true if we found package.json or .git
    return true;
}

export {findTodoLocation};