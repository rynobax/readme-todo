// readme-todo-cli
import {parse} from './parse';
import {getMessage} from './message';
import {findTodoLocation} from './todo';

let start = 1;
if(process.argv[0] == 'node') start++;
const args = process.argv.slice(start);

const action = parse(args);
const todoLocation = findTodoLocation(__dirname);
const message = getMessage(action, todoLocation);
console.log(message);
