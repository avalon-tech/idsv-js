import "mocha";
import { assert } from "chai";

import { isValidDUI, formatDUI, isValidNIT, formatNIT } from "../src";

describe("isValidDUI", () => {
  it("should be a function with a single parameter", () => {
    assert.strictEqual(isValidDUI.length, 1);
  });

  it("should return true for valid DUIs", () => {
    assert.isTrue(isValidDUI("123456784"));
    assert.isTrue(isValidDUI("12345678-4"));
    assert.isTrue(isValidDUI("18"));
    assert.isTrue(isValidDUI(18));
  });

  it("should return false for invalid DUIs", () => {
    assert.isFalse(isValidDUI("123456789"));
    assert.isFalse(isValidDUI("12345678-9"));
    assert.isFalse(isValidDUI("01"));
    assert.isFalse(isValidDUI(1));
  });

  it("should return false for non-numeric DUIs", () => {
    assert.isFalse(isValidDUI("abcdefghi"));
  });

  it("should return false for input that only looks like a number", () => {
    assert.isFalse(isValidDUI("1e5"));
    assert.isFalse(isValidDUI("1.5"));
    assert.isFalse(isValidDUI("12 34"));
    assert.isFalse(isValidDUI(1.5));
    assert.isFalse(isValidDUI(-18));
    assert.isFalse(isValidDUI(NaN));
  });

  it("should return false for values that are neither a string nor a number", () => {
    assert.isFalse(isValidDUI(undefined as unknown as string));
    assert.isFalse(isValidDUI(null as unknown as string));
  });

  it("should return true for valid DUI with spaces at the start or the end", () => {
    assert.isTrue(isValidDUI(" 123456784"));
    assert.isTrue(isValidDUI("123456784 "));
    assert.isTrue(isValidDUI(" 123456784 "));
  });

  it("should return false for empty string", () => {
    assert.isFalse(isValidDUI(""));
  });

  it("should return false for DUIs made only of zeros", () => {
    assert.isFalse(isValidDUI("000000000"));
    assert.isFalse(isValidDUI("00000000-0"));
    assert.isFalse(isValidDUI("00"));
    assert.isFalse(isValidDUI(0));
  });
});

describe("isValidNIT", () => {
  it("should be a function with a single parameter", () => {
    assert.strictEqual(isValidNIT.length, 1);
  });

  it("should return true for valid DUIs by default", () => {
    assert.isTrue(isValidNIT("123456784"));
    assert.isTrue(isValidNIT("12345678-4"));
    assert.isTrue(isValidNIT("18"));
    assert.isTrue(isValidNIT(18));
  });

  it("should return false for invalid DUIs by default", () => {
    assert.isFalse(isValidNIT("123456789"));
    assert.isFalse(isValidNIT("12345678-9"));
    assert.isFalse(isValidNIT("01"));
    assert.isFalse(isValidNIT(1));
  });

  it("should return false for non-numeric DUIs by default", () => {
    assert.isFalse(isValidNIT("abcdefghi"));
  });

  it("should return false for input that only looks like a number", () => {
    assert.isFalse(isValidNIT("1e5"));
    assert.isFalse(isValidNIT("1.5"));
    assert.isFalse(isValidNIT("12 34"));
    assert.isFalse(isValidNIT(1.5));
    assert.isFalse(isValidNIT(-18));
    assert.isFalse(isValidNIT(NaN));
    assert.isFalse(isValidNIT("1e5", false));
    assert.isFalse(isValidNIT("12 34", false));
  });

  it("should return false for values that are neither a string nor a number", () => {
    assert.isFalse(isValidNIT(undefined as unknown as string));
    assert.isFalse(isValidNIT(null as unknown as string));
  });

  it("should return false for valid DUIs when allowDUI is false", () => {
    // 00000001-8 is a valid DUI but not a valid NIT, so it should return false
    assert.isFalse(isValidNIT("000000018", false));
    assert.isFalse(isValidNIT("00000001-8", false));
    assert.isFalse(isValidNIT("18", false));
    assert.isFalse(isValidNIT(18, false));
  });

  it("should return false for NITs longer than 14 digits", () => {
    // Only the first 14 digits were read, so a longer number passed on the
    // strength of a valid prefix
    assert.isFalse(isValidNIT("123456789012300", false));
    assert.isFalse(isValidNIT("1234567890123000", false));
    assert.isFalse(isValidNIT("1234-567890-123-00"));
    assert.isFalse(isValidNIT(123456789012300));
  });

  it("should return true for valid NITs when allowDUI is false", () => {
    assert.isTrue(isValidNIT("12345678901230", false));
    assert.isTrue(isValidNIT("1234-567890-123-0", false));
    assert.isTrue(isValidNIT("115", false));
    assert.isTrue(isValidNIT(115, false));
    assert.isTrue(isValidNIT("10000000000090", false)); // This tests the old routine with a zero check digit
    assert.isTrue(isValidNIT("00000000001040", false)); // This tests the new routine with a zero check digit
  });

  it("should return false for invalid NITs when allowDUI is false", () => {
    assert.isFalse(isValidNIT("12345678901231", false));
    assert.isFalse(isValidNIT("1234-567890-123-1", false));
    assert.isFalse(isValidNIT("01", false));
    assert.isFalse(isValidNIT(1, false));
  });

  it("should return false for non-numeric NITs when allowDUI is false", () => {
    assert.isFalse(isValidNIT("abcdefghi"));
  });

  it("should return true for valid NITs with spaces at the start or the end", () => {
    assert.isTrue(isValidNIT(" 12345678901230"));
    assert.isTrue(isValidNIT("12345678901230 "));
    assert.isTrue(isValidNIT(" 12345678901230 "));
  });

  it("should return false for empty string", () => {
    assert.isFalse(isValidNIT(""));
  });

  it("should return false for NITs made only of zeros", () => {
    assert.isFalse(isValidNIT("00000000000000"));
    assert.isFalse(isValidNIT("0000-000000-000-0"));
    assert.isFalse(isValidNIT("00"));
    assert.isFalse(isValidNIT(0));
    assert.isFalse(isValidNIT("00000000000000", false));
    assert.isFalse(isValidNIT("0000-000000-000-0", false));
  });
});

describe("formatDUI", () => {
  it("should be a function with a single parameter", () => {
    assert.strictEqual(formatDUI.length, 1);
  });

  it("should return a formatted DUI", () => {
    assert.strictEqual(formatDUI("123456784"), "12345678-4");
    assert.strictEqual(formatDUI("12345678-4"), "12345678-4");
    assert.strictEqual(formatDUI("18"), "00000001-8");
    assert.strictEqual(formatDUI(" 123456784"), "12345678-4");
    assert.strictEqual(formatDUI("123456784 "), "12345678-4");
    assert.strictEqual(formatDUI(" 123456784 "), "12345678-4");
    assert.strictEqual(formatDUI(18), "00000001-8");
  });

  it("should throw an error for invalid DUIs", () => {
    assert.throws(() => formatDUI("123456789"));
    assert.throws(() => formatDUI("12345678-9"));
    assert.throws(() => formatDUI("01"));
    assert.throws(() => formatDUI(" 123456789"));
    assert.throws(() => formatDUI("123456789 "));
    assert.throws(() => formatDUI(" 123456789 "));
    assert.throws(() => formatDUI(1));
  });

  it("should throw an error for input that is not a document", () => {
    assert.throws(() => formatDUI(""), "Invalid DUI");
    assert.throws(() => formatDUI("abc"), "Invalid DUI");
    assert.throws(() => formatDUI("12 34"), "Invalid DUI");
    assert.throws(() => formatDUI(NaN), "Invalid DUI");
    assert.throws(() => formatDUI(-18), "Invalid DUI");
    assert.throws(
      () => formatDUI(undefined as unknown as string),
      "Invalid DUI"
    );
    assert.throws(() => formatDUI(null as unknown as string), "Invalid DUI");
  });

  it("should throw an error for DUIs made only of zeros", () => {
    assert.throws(() => formatDUI("000000000"), "Invalid DUI");
    assert.throws(() => formatDUI("00000000-0"), "Invalid DUI");
    assert.throws(() => formatDUI("00"), "Invalid DUI");
    assert.throws(() => formatDUI(0), "Invalid DUI");
  });
});

describe("formatNIT", () => {
  it("should be a function with a single parameter", () => {
    assert.strictEqual(formatNIT.length, 1);
  });

  it("should return a formatted NIT", () => {
    assert.strictEqual(formatNIT("09999999991017"), "0999-999999-101-7");
    assert.strictEqual(formatNIT("0999-999999-101-7"), "0999-999999-101-7");
    assert.strictEqual(formatNIT(9999999991017), "0999-999999-101-7");
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
    assert.strictEqual(formatNIT("12345678901230", false), "1234-567890-123-0");
    assert.strictEqual(
      formatNIT("1234-567890-123-0", false),
      "1234-567890-123-0"
    );
    assert.strictEqual(formatNIT("115", false), "0000-000000-011-5");
    assert.strictEqual(formatNIT(115, false), "0000-000000-011-5");
  });

  it("should throw an error for invalid DUIs", () => {
    assert.throws(() => formatNIT("123456789"));
    assert.throws(() => formatNIT("12345678-9"));
    assert.throws(() => formatNIT("01"));
    assert.throws(() => formatNIT(1));
  });

  it("should throw an error for invalid NITs", () => {
    assert.throws(() => formatNIT("12345678901231", false));
    assert.throws(() => formatNIT("1234-567890-123-1", false));
    assert.throws(() => formatNIT("01", false));
    assert.throws(() => formatNIT(1, false));
  });

  it("should throw an error for input that is not a document", () => {
    assert.throws(() => formatNIT(""), "Invalid NIT");
    assert.throws(() => formatNIT("abc"), "Invalid NIT");
    assert.throws(() => formatNIT("12 34"), "Invalid NIT");
    assert.throws(() => formatNIT(NaN), "Invalid NIT");
    assert.throws(() => formatNIT(-18), "Invalid NIT");
    assert.throws(
      () => formatNIT(undefined as unknown as string),
      "Invalid NIT"
    );
    assert.throws(() => formatNIT(null as unknown as string), "Invalid NIT");
    assert.throws(() => formatNIT("", false), "Invalid NIT");
    assert.throws(() => formatNIT("abc", false), "Invalid NIT");
  });

  it("should throw an error for NITs made only of zeros", () => {
    assert.throws(() => formatNIT("00000000000000"), "Invalid NIT");
    assert.throws(() => formatNIT("0000-000000-000-0"), "Invalid NIT");
    assert.throws(() => formatNIT("00"), "Invalid NIT");
    assert.throws(() => formatNIT(0), "Invalid NIT");
    assert.throws(() => formatNIT("00000000000000", false), "Invalid NIT");
  });
});
