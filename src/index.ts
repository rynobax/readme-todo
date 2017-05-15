// readme-todo-cli
import {parse} from './parse';
import {getMessage} from './message';
import {findTodoList} from './findTodo';

let start = 1;
if(process.argv[0] == 'node') start++;
const args = process.argv.slice(start);

const action = parse(args);
const todoListLocation = findTodoList(__dirname);
const message = getMessage(action, todoListLocation);
console.log(message);
