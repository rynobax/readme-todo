"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("./action");
const parse = (args) => {
    if (args.length < 1)
        return action_1.Action.CURRENT;
    const cmd = args[0];
    switch (cmd) {
        case ('ls'):
        case ('l'):
            return action_1.Action.LIST;
        case ('next'):
        case ('n'):
            return action_1.Action.NEXT;
        case ('prev'):
        case ('p'):
            return action_1.Action.PREV;
        case ('close'):
        case ('c'):
            return action_1.Action.CLOSE;
        case ('open'):
        case ('o'):
            return action_1.Action.OPEN;
        default:
            return action_1.Action.INVALID;
    }
};
exports.parse = parse;
