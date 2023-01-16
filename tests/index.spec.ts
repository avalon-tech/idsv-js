import 'mocha';
import { assert } from 'chai';

import { isValidDUI, isValidNIT } from '../src';

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

describe('isValidNIT', () => {
    it('should be a function with a single parameter', () => {
        assert.strictEqual(isValidNIT.length, 1);
    });

    it('should return true for valid DUIs by default', () => {
        assert.isTrue(isValidNIT('000000000'));
        assert.isTrue(isValidNIT('00000000-0'));
        assert.isTrue(isValidNIT('00'));
    });

    it('should return false for invalid DUIs by default', () => {
        assert.isFalse(isValidNIT('000000001'));
        assert.isFalse(isValidNIT('00000000-1'));
        assert.isFalse(isValidNIT('01'));
    });

    it('should return false for valid DUIs when allowDUI is false', () => {
        // 00000001-8 is a valid DUI but not a valid NIT, so it should return false
        assert.isFalse(isValidNIT('000000018', false));
        assert.isFalse(isValidNIT('00000001-8', false));
        assert.isFalse(isValidNIT('18', false));
    });

});