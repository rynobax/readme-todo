const expect = require('chai').expect;
import {parse} from './parse';
import {Action} from './action';

describe('parse', () => {
    it('should return current on empty args', () => {
        const args: string[] = [];
        expect(parse(args)).to.equal(Action.CURRENT);
    });
    it('should return invalid on garbage input', () => {
        const args: string[] = ['dsalghklsghkljasd'];
        expect(parse(args)).to.equal(Action.INVALID);
    });

    it('should return list on ls', () => {
        const args: string[] = ['ls'];
        expect(parse(args)).to.equal(Action.LIST);
    });

    it('should return list on l', () => {
        const args: string[] = ['l'];
        expect(parse(args)).to.equal(Action.LIST);
    });
    
    it('should return next on next', () => {
        const args: string[] = ['next'];
        expect(parse(args)).to.equal(Action.NEXT);
    });
    
    it('should return next on n', () => {
        const args: string[] = ['n'];
        expect(parse(args)).to.equal(Action.NEXT);
    });
    
    it('should return prev on prev', () => {
        const args: string[] = ['prev'];
        expect(parse(args)).to.equal(Action.PREV);
    });
    
    it('should return prev on p', () => {
        const args: string[] = ['p'];
        expect(parse(args)).to.equal(Action.PREV);
    });
    
    it('should return close on close', () => {
        const args: string[] = ['close'];
        expect(parse(args)).to.equal(Action.CLOSE);
    });
    
    it('should return close on c', () => {
        const args: string[] = ['c'];
        expect(parse(args)).to.equal(Action.CLOSE);
    });
    
    it('should return open on open', () => {
        const args: string[] = ['open'];
        expect(parse(args)).to.equal(Action.OPEN);
    });
    
    it('should return open on o', () => {
        const args: string[] = ['o'];
        expect(parse(args)).to.equal(Action.OPEN);
    });
});