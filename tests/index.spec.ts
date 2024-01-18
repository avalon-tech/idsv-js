import "mocha";
import { assert } from "chai";

import { isValidDUI, formatDUI, isValidNIT, formatNIT } from "../src";

describe("isValidDUI", () => {
  it("should be a function with a single parameter", () => {
    assert.strictEqual(isValidDUI.length, 1);
  });

  it("should return true for valid DUIs", () => {
    assert.isTrue(isValidDUI("000000000"));
    assert.isTrue(isValidDUI("00000000-0"));
    assert.isTrue(isValidDUI("00"));
    assert.isTrue(isValidDUI(0));
  });

  it("should return false for invalid DUIs", () => {
    assert.isFalse(isValidDUI("000000001"));
    assert.isFalse(isValidDUI("00000000-1"));
    assert.isFalse(isValidDUI("01"));
    assert.isFalse(isValidDUI(1));
  });

  it("should return false for non-numeric DUIs", () => {
    assert.isFalse(isValidDUI("abcdefghi"));
  });

  it("should return true for valid DUI with spaces at the start or the end", () => {
    assert.isTrue(isValidDUI(" 000000000"));
    assert.isTrue(isValidDUI("000000000 "));
    assert.isTrue(isValidDUI(" 000000000 "));
  });

  it("should return false for empty string", () => {
    assert.isFalse(isValidDUI(""));
  });
});

describe("isValidNIT", () => {
  it("should be a function with a single parameter", () => {
    assert.strictEqual(isValidNIT.length, 1);
  });

  it("should return true for valid DUIs by default", () => {
    assert.isTrue(isValidNIT("000000000"));
    assert.isTrue(isValidNIT("00000000-0"));
    assert.isTrue(isValidNIT("00"));
    assert.isTrue(isValidNIT(0));
  });

  it("should return false for invalid DUIs by default", () => {
    assert.isFalse(isValidNIT("000000001"));
    assert.isFalse(isValidNIT("00000000-1"));
    assert.isFalse(isValidNIT("01"));
    assert.isFalse(isValidNIT(1));
  });

  it("should return false for non-numeric DUIs by default", () => {
    assert.isFalse(isValidNIT("abcdefghi"));
  });

  it("should return false for valid DUIs when allowDUI is false", () => {
    // 00000001-8 is a valid DUI but not a valid NIT, so it should return false
    assert.isFalse(isValidNIT("000000018", false));
    assert.isFalse(isValidNIT("00000001-8", false));
    assert.isFalse(isValidNIT("18", false));
    assert.isFalse(isValidNIT(18, false));
  });

  it("should return true for valid NITs when allowDUI is false", () => {
    assert.isTrue(isValidNIT("00000000000000", false));
    assert.isTrue(isValidNIT("0000-000000-000-0", false));
    assert.isTrue(isValidNIT("00", false));
    assert.isTrue(isValidNIT(0, false));
    assert.isTrue(isValidNIT("10000000000090", false)); // This tests the old routine with a zero check digit
    assert.isTrue(isValidNIT("00000000001040", false)); // This tests the new routine with a zero check digit
  });

  it("should return false for invalid NITs when allowDUI is false", () => {
    assert.isFalse(isValidNIT("00000000000001", false));
    assert.isFalse(isValidNIT("0000-000000-000-1", false));
    assert.isFalse(isValidNIT("01", false));
    assert.isFalse(isValidNIT(1, false));
  });

  it("should return false for non-numeric NITs when allowDUI is false", () => {
    assert.isFalse(isValidNIT("abcdefghi"));
  });

  it("should return true for valid NITs with spaces at the start or the end", () => {
    assert.isTrue(isValidNIT(" 00000000000000"));
    assert.isTrue(isValidNIT("00000000000000 "));
    assert.isTrue(isValidNIT(" 00000000000000 "));
  });

  it("should return false for empty string", () => {
    assert.isFalse(isValidNIT(""));
  });
});

describe("formatDUI", () => {
  it("should be a function with a single parameter", () => {
    assert.strictEqual(formatDUI.length, 1);
  });

  it("should return a formatted DUI", () => {
    assert.strictEqual(formatDUI("000000000"), "00000000-0");
    assert.strictEqual(formatDUI("00000000-0"), "00000000-0");
    assert.strictEqual(formatDUI("00"), "00000000-0");
    assert.strictEqual(formatDUI(" 000000000"), "00000000-0");
    assert.strictEqual(formatDUI("000000000 "), "00000000-0");
    assert.strictEqual(formatDUI(" 000000000 "), "00000000-0");
    assert.strictEqual(formatDUI(0), "00000000-0");
  });

  it("should throw an error for invalid DUIs", () => {
    assert.throws(() => formatDUI("000000001"));
    assert.throws(() => formatDUI("00000000-1"));
    assert.throws(() => formatDUI("01"));
    assert.throws(() => formatDUI(" 000000001"));
    assert.throws(() => formatDUI("000000001 "));
    assert.throws(() => formatDUI(" 000000001 "));
    assert.throws(() => formatDUI(1));
  });
});

describe("formatNIT", () => {
  it("should be a function with a single parameter", () => {
    assert.strictEqual(formatNIT.length, 1);
  });

  it("should return a formatted NIT", () => {
    assert.strictEqual(formatNIT("06140703201049"), "0614-070320-104-9");
    assert.strictEqual(formatNIT("0614-070320-104-9"), "0614-070320-104-9");
    assert.strictEqual(formatNIT(6140703201049), "0614-070320-104-9");
  });

  it("should return a formatted DUI by default if a valid DUI is input", () => {
    assert.strictEqual(formatNIT("000000018"), "00000001-8");
    assert.strictEqual(formatNIT("00000001-8"), "00000001-8");
    assert.strictEqual(formatNIT("18"), "00000001-8");
    assert.strictEqual(formatNIT(18), "00000001-8");
  });

  it("should throw an error if DUI is formatted when allowDUI is false", () => {
    assert.throws(() => formatNIT("000000018", false));
    assert.throws(() => formatNIT("00000001-8", false));
    assert.throws(() => formatNIT("18", false));
    assert.throws(() => formatNIT(18, false));
  });

  it("should return a formatted NIT when allowDUI is false", () => {
    assert.strictEqual(formatNIT("00000000000000", false), "0000-000000-000-0");
    assert.strictEqual(
      formatNIT("0000-000000-000-0", false),
      "0000-000000-000-0"
    );
    assert.strictEqual(formatNIT("00", false), "0000-000000-000-0");
    assert.strictEqual(formatNIT(0, false), "0000-000000-000-0");
  });

  it("should throw an error for invalid DUIs", () => {
    assert.throws(() => formatNIT("000000001"));
    assert.throws(() => formatNIT("00000000-1"));
    assert.throws(() => formatNIT("01"));
    assert.throws(() => formatNIT(1));
  });

  it("should throw an error for invalid NITs", () => {
    assert.throws(() => formatNIT("00000000000001", false));
    assert.throws(() => formatNIT("0000-000000-000-1", false));
    assert.throws(() => formatNIT("01", false));
    assert.throws(() => formatNIT(1, false));
  });
});
