import 'mocha';
import { assert } from 'chai';

import { isValidDUI } from '../src';

describe('isValidDUI', () => {
    it('should be a function with a single parameter', () => {
        assert.strictEqual(isValidDUI.length, 1);
    });

    it('should return true for valid DUIs', () => {
        assert.isTrue(isValidDUI('000000000'));
        assert.isTrue(isValidDUI('00000000-0'));
        assert.isTrue(isValidDUI('00'));
    });

    it('should return false for invalid DUIs', () => {
        assert.isFalse(isValidDUI('000000001'));
        assert.isFalse(isValidDUI('00000000-1'));
        assert.isFalse(isValidDUI('01'));
    });
});