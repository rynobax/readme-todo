// Returns all todos
import fs = require('fs');
import {TodoReader, Todo} from '../TodoReader';

function getTreeSize(tree: (string | string[])[]){
    return tree.reduce((sum, branch) => {
        if(Array.isArray(branch)){
            return sum + getTreeSize(branch) - 1;
        }
        return sum + 1;
    }, 0);
}

const list = (todoReader: TodoReader, listLen: number, includeCompleted: boolean): Promise<string> => {
    return new Promise((resolve, reject) => {
        // Use custom data structure to represent the todo list
    });
};

export {list};