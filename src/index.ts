// readme-todo-cli
import {findTodoListLocation} from './findTodo';
import {TodoReader} from './TodoReader';
import {doAction} from './action';

let start = 1;
if(process.argv[0] == 'node') start++;
const args = process.argv.slice(start);

const todoListLocation = findTodoListLocation(__dirname);

let message = '';
if(todoListLocation == null) {
    console.log('Could not find a todo list');
} else {
    const todoReader = new TodoReader(todoListLocation);
    doAction(args, todoReader).then(console.log);
}