const expect = require('chai').expect;
const mock = require('mock-fs');
import {TodoReader} from './TodoReader';

const bigReadme = `
# my readme
A description of my Application

# Todo:
* [x] I finished this
* [x] This one too!
    * [x] And this subpoint
    * [x] And this other subpoint
* This is the next todo
* These are more todos
  * Sub todo
  * Another sub todo
    * A sub sub todo
* The last todo

Some text down here
The end!`;

const smallReadme = `
# my readme
A description of my Application

# Todo:
* [x] Todo 1
* [ ] Todo 2
* [ ] Todo 3

Some text down here
The end!`;

const smallX = `
# Todo:
* [x] Todo 1
`;

const bigX = `
# Todo:
* [X] Todo 1
`;

const starBullet = `
# Todo:
* [X] Todo 1
`;

describe('TodoReader', () => {
    it('should stream the file in the correct order', (done) => {
        mock({
            '/test': {
                'readme.md': smallReadme,
            },
        });
        const TR = new TodoReader('/test/readme.md');
        const messages: string[] = [];
        TR.stream.on('file', (line) => {
            messages.push(line.toString());
        });
        TR.stream.on('todoOpen', (line) => {
            messages.push(line.toString());
        });
        TR.stream.on('todoClosed', (line) => {
            messages.push(line.toString());
        });
        TR.stream.on('fileEnd', () => {
            mock.restore();
            expect(messages).to.eql(smallReadme.split('\n'));
            done();
        });
    });

    it('should detect small x', (done) => {
        mock({
            '/test': {
                'readme.md': smallX,
            },
        });
        const TR = new TodoReader('/test/readme.md');
        TR.stream.on('fileEnd', () => {
            mock.restore();
            expect(TR.style.marker).to.equal('x');
            done();
        });
    });

    it('should detect big x', (done) => {
        mock({
            '/test': {
                'readme.md': bigX,
            },
        });
        const TR = new TodoReader('/test/readme.md');
        TR.stream.on('fileEnd', () => {
            mock.restore();
            expect(TR.style.marker).to.equal('X');
            done();
        });
    });

    it('should detect bullet', (done) => {
        mock({
            '/test': {
                'readme.md': starBullet,
            },
        });
        const TR = new TodoReader('/test/readme.md');
        TR.stream.on('fileEnd', () => {
            mock.restore();
            expect(TR.style.bullet).to.equal('*');
            done();
        });
    });
});