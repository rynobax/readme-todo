const expect = require('chai').expect;
const mock = require('mock-fs');
import {findTodoListLocation} from './findTodo';

describe('findTodo', () => {
    afterEach(mock.restore);
    
    it('should find the todo in the same directory', () => {
        mock({
            '/test': {
                'readme.md': 'TODO',
            },
        });
        expect(findTodoListLocation('/test')).to.equal('\\test\\readme.md');
    });

    it('should find the todo in a directory beneath it', () => {
        mock({
            '/test': {
                'readme.md': 'TODO',
                'another': {}
            },
        });
        expect(findTodoListLocation('/test/another')).to.equal('\\test\\readme.md');
    });

    it('should return null if it sees a file that should be a root dir', () => {
        mock({
            '/test': {
                'readme.md': 'TODO',
                'another': {
                    '.git': 'git out'
                }
            },
        });
        expect(findTodoListLocation('/test/another')).to.equal(null);

        mock({
            '/test': {
                'readme.md': 'TODO',
                'another': {
                    'package.json': 'get out'
                }
            },
        });
        expect(findTodoListLocation('/test/another')).to.equal(null);
    });

    it('should return null if the readme it finds has no todo', () => {
        mock({
            '/test': {
                'readme.md': 'not here'
            },
        });
        expect(findTodoListLocation('/test')).to.equal(null);
    });
})