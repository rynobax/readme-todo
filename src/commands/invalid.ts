// Returns error message

const invalid = (): Promise<string> => {
    return Promise.resolve('Invalid command');
};

export {invalid};