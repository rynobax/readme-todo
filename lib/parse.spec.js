"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expect = require('chai').expect;
const parse_1 = require("./parse");
const action_1 = require("./action");
describe('parse', () => {
    it('should return current on empty args', () => {
        const args = [];
        expect(parse_1.parse(args)).to.equal(action_1.Action.CURRENT);
    });
    it('should return invalid on garbage input', () => {
        const args = ['dsalghklsghkljasd'];
        expect(parse_1.parse(args)).to.equal(action_1.Action.INVALID);
    });
    it('should return list on ls', () => {
        const args = ['ls'];
        expect(parse_1.parse(args)).to.equal(action_1.Action.LIST);
    });
    it('should return list on l', () => {
        const args = ['l'];
        expect(parse_1.parse(args)).to.equal(action_1.Action.LIST);
    });
    it('should return next on next', () => {
        const args = ['next'];
        expect(parse_1.parse(args)).to.equal(action_1.Action.NEXT);
    });
    it('should return next on n', () => {
        const args = ['n'];
        expect(parse_1.parse(args)).to.equal(action_1.Action.NEXT);
    });
    it('should return prev on prev', () => {
        const args = ['prev'];
        expect(parse_1.parse(args)).to.equal(action_1.Action.PREV);
    });
    it('should return prev on p', () => {
        const args = ['p'];
        expect(parse_1.parse(args)).to.equal(action_1.Action.PREV);
    });
    it('should return close on close', () => {
        const args = ['close'];
        expect(parse_1.parse(args)).to.equal(action_1.Action.CLOSE);
    });
    it('should return close on c', () => {
        const args = ['c'];
        expect(parse_1.parse(args)).to.equal(action_1.Action.CLOSE);
    });
    it('should return open on open', () => {
        const args = ['open'];
        expect(parse_1.parse(args)).to.equal(action_1.Action.OPEN);
    });
    it('should return open on o', () => {
        const args = ['o'];
        expect(parse_1.parse(args)).to.equal(action_1.Action.OPEN);
    });
});
