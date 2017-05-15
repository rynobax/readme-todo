import {Action} from './action';

const parse = (args: string[]): Action => {
    if(args.length < 1) return Action.CURRENT;
    const cmd = args[0];
    switch(cmd){
        case('ls'):
        case('l'):
            return Action.LIST;
        case('next'):
        case('n'):
            return Action.NEXT;
        case('prev'):
        case('p'):
            return Action.PREV;
        case('close'):
        case('c'):
            return Action.CLOSE;
        case('open'):
        case('o'):
            return Action.OPEN;
        default:
            return Action.INVALID;
    }
};

export {parse};