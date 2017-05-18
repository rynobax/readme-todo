import fs = require('fs');
import readline = require('readline');
import stream = require('stream');

export interface Todo {
    msg: string,
    completed: boolean,
    padding: number
}

export interface TodoListStyle {
    bullet: string | null,
    marker: string | null,
    tabSize: number | null
}

export class TodoReader {
    stream: stream.Readable;
    style: TodoListStyle;

    constructor(filePath: string){
        this.stream = new stream.Readable;
        this.stream.setEncoding('utf8');
        this.stream._read = function(){};

        this.style = {
            bullet: null,
            marker: null,
            tabSize: null
        };

        const TR = this;

        const readable = readline.createInterface({input: fs.createReadStream(filePath)});
        let lastPadding: number | null = null;
        readable.on('line', (line: string) => {
            if(line.includes('[ ]') || line.includes('[x]') || line.includes('[X]')) {
                // It's an incomplete todo item
                const completed = !line.includes('[ ]');
                const padding = line.indexOf('[') - 2;
                const msg = line.slice(line.indexOf(']') + 1);

                /*
                if(TR.style.tabSize != null && lastPadding != null && padding > lastPadding){
                    this.style.tabSize = padding - lastPadding;
                }
                */

                const todo: Todo = {
                    msg: msg,
                    completed: completed,
                    padding: padding
                };
                TR.stream.emit('todo', JSON.stringify(todo));

                // Set the style variables
                if(TR.style.bullet == null){
                    TR.style.bullet = line.charAt(line.indexOf('[') - 2);
                }
                if(TR.style.marker == null){
                    if(line.includes('[x]')){
                        TR.style.marker = 'x';
                    } else if(line.includes('[X]')) {
                        TR.style.marker = 'X';
                    }
                }
            } else {
                // It's the other readme stuff
                // We need it if we want to modify the todo list
                TR.stream.emit('file', line);
            }
        });
        readable.on('close', () => {
            TR.stream.emit('fileEnd');
        });
    }
}