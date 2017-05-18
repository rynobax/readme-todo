// Returns all todos
import fs = require('fs');
import {TodoReader, Todo} from '../TodoReader';

interface TodoList {
    msg: String,
    children?: TodoList[],
    parent?: TodoList,
    completed?: boolean
}

function* todoListGenerator(list: TodoList){
    yield {
        msg: list.msg,
        parent: list.parent,
        completed: list.completed
    };
    if(list.children){
        for(const child of list.children){
            yield *todoListGenerator(child);
        }
    }
}

export const list = (todoReader: TodoReader, listLen: number, includeCompleted: boolean): Promise<string> => {
    return new Promise((resolve, reject) => {
        const todoList: TodoList = {
            msg: 'Todo',
            children: []
        };
        let currentPadding: number | null = null;
        let node: TodoList = todoList;
        todoReader.stream.on('todo', (todoJson) => {
            const todo: Todo = JSON.parse(todoJson);
            if(currentPadding == null || currentPadding == todo.padding){
                // Don't need to modify node
            } else if(currentPadding < todo.padding){
                // Increase our node depth
                if(node.children) {
                    node = node.children[node.children.length-1];
                } else {
                    throw 'Invalid children';
                }
            } else if(currentPadding > todo.padding) {
                // Decrease our node depth
                if(node.parent !== undefined){
                    node = node.parent;
                } else {
                    throw 'Invalid depth';
                }
            }
            if(!node.children) node.children = [];
            node.children.push({
                msg: todo.msg,
                parent: node,
                completed: todo.completed
            });
            currentPadding = todo.padding;
        });
        todoReader.stream.on('fileEnd', () => {
            const gen = todoListGenerator(todoList);
            gen.next();
            let res = gen.next();
            while(!res.done){
                const todo: TodoList = res.value;
                if(!todo.completed){
                    let node = todo;
                    do{
                        console.log(node.msg);
                        if(node.parent) node = node.parent;
                    }while(node.parent)
                    return;
                }
                res = gen.next();
            }
            resolve();
        })
    });
};

export const current = (todoReader: TodoReader): Promise<string> => {
    return new Promise((resolve, reject) => {
        const todos: Todo[] = [];
        let currentPadding: number = 0;
        todoReader.stream.on('todo', (todoJson) => {
            // Stop tracking once we find a todo to be done
            if(currentPadding == 0){
                const todo: Todo = JSON.parse(todoJson);
                todos.push(todo);
                if(currentPadding == 0 && !todo.completed){
                    currentPadding = todo.padding;
                }
            }
        });

        todoReader.stream.on('fileEnd', () => {
            console.log('todos: ', todos);
            const todosToDisplay: Todo[] = [];
            todos.reverse();
            const first = todos.pop();
            if(first != undefined){
                todosToDisplay.push(first);
                for(const todo of todos) {
                    if(todo.padding < currentPadding){
                        todosToDisplay.push(todo);
                    }
                }
            }
            todosToDisplay.reverse();
            resolve(
                todosToDisplay
                    .map((todo, ndx) => {
                        let pad = '';
                        for(let i=0; i<ndx; i++){
                            pad += '  ';
                        }
                        return pad + todo.msg;
                    })
                    .join('\n')
            );
        });
    });
}