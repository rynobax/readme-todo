const expect = require('chai').expect;
const mock = require('mock-fs');
import {list} from './list';

const bigReadme = `
# my readme
A description of my Application

# Todo:
* ~~I finished this~~
* ~~This one too!~~
    * ~~ And this subpoint ~~
    * ~~ And this other subpoint
* This is the next todo
* These are more todos
  * Sub todo
  * Another sub todo
    * A sub sub todo
* The last todo

Some text down here
The end!
`;

const smallReadme = `
# my readme
A description of my Application

# Todo:
* ~~Todo 1~~
* Todo 2
* Todo 3

Some text down here
The end!
`;

describe('list', () => {
    afterEach(mock.restore);
});