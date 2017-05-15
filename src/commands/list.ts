// Returns all todos
import fs = require('fs');

const list = (filePath: string) => {
    const lines = fs.readFileSync(filePath).toString().split('\n');
    let beforeTodo = true;
    let afterList = false;
    const todoList = [];
    for(const line of lines){
        if(beforeTodo){
            if(line.toLowerCase().includes('# todo')) beforeTodo = false;
        } else {
            if(!afterList){
                if(line.includes('*')){
                    todoList.push(line);
                } else {
                    break;
                }
            }
        }
    }
    return todoList.join('\n');
};

export {list};