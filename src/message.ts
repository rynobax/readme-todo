import {Action} from './action';
import {list} from './commands/list';
import {invalid} from './commands/invalid';


// Maps actions to command functions
const getMessage = (action: Action, todoLocation: string | null): string => {
    if(todoLocation == null) return invalid();
    switch(action){
        case(Action.LIST):
            return list();
        case(Action.INVALID):
        default:
            return invalid();
    }
}

export {getMessage};