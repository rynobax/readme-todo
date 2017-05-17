import {invalid} from './commands/invalid';
import {list} from './commands/list';

const doAction = (args: string[], todoReader): Promise<string> => {
    if(args.length < 1) return list(todoReader, 1, false);
    const cmd = args[0];
    switch(cmd){
        case('ls'):
        case('l'):
            return list(todoReader, 999, true);
        default:
            return invalid();
    }
};

export {doAction};