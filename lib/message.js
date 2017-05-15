"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const action_1 = require("./action");
const list_1 = require("./commands/list");
const invalid_1 = require("./commands/invalid");
// Maps actions to command functions
const getMessage = (action, todoLocation) => {
    if (todoLocation == null)
        return invalid_1.invalid();
    switch (action) {
        case (action_1.Action.LIST):
            return list_1.list();
        case (action_1.Action.INVALID):
        default:
            return invalid_1.invalid();
    }
};
exports.getMessage = getMessage;
