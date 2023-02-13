const {
  createHash,
  hasLength,
  isDate,
  isNumber,
  isObject,
  isString,
  keyIsOversized,
  MAX_PARTITION_KEY_LENGTH,
  noDataInside,
} = require('./utils');

describe("utils", () => {
  const bigArray = Array(MAX_PARTITION_KEY_LENGTH + 1).fill("7");
  const bigObejct = {};
  let bigString = '';

  bigArray.forEach((item, index) => {
    bigObejct[index] = item;
    bigString += item; 
  });

  const VALUES = [42, "Speak Friend", new Date(), { clipboard: 'health' }, [6, 5, 3]];
  const OVERSIZED_VALUES = [bigArray, bigObejct, bigString];
  const NON_STRING_VALUES = [42, new Date(), { clipboard: 'health' }, [6, 5, 3]];
  const NON_NUMBER_VALUES = ["Speak Friend", new Date(), { clipboard: 'health' }, [6, 5, 3]];
  const NON_DATE_VALUES = [42, "Speak Friend", { clipboard: 'health' }, [6, 5, 3]];
  const NON_OBJECT_VALUES = [42, "Speak Friend", new Date(), [6, 5, 3]];
  const EMPTY_VALUES = [, null, undefined, '', {}, []]

  it("Is a number", () => {
    expect(typeof MAX_PARTITION_KEY_LENGTH).toBe('number');
  });

  it("Return true if it's Date", () => {
    expect(isDate(new Date())).toBe(true);
  });

  test.each(NON_DATE_VALUES)
    ("Returns false if it's not Date", (value) => {
      expect(isDate(value)).toBe(false);
    });

  it("Return true if it's string", () => {
    expect(isString('string')).toBe(true);
  });

  test.each(NON_STRING_VALUES)
    ("Returns false if it's not string", (value) => {
      expect(isString(value)).toBe(false);
    });

  it("Return true if it's number", () => {
    expect(isNumber(42)).toBe(true);
  });

  test.each(NON_NUMBER_VALUES)
    ("Returns false if it's not number", (value) => {
      expect(isNumber(value)).toBe(false);
    });

  it("Return true if it's Object", () => {
    expect(isObject({ clipeboard: 'health' })).toBe(true);
  });
  
  test.each(NON_OBJECT_VALUES)
    ("Returns false if it's not Object", (value) => {
      expect(isObject(value)).toBe(false);
    });

  test.each(EMPTY_VALUES)
    ("Returns true if it's emtpy", (value) => {
      expect(noDataInside(value)).toBe(true);
    });
  
  test.each(VALUES)
    ("Returns false if it's not empty", (value) => {
      expect(noDataInside(value)).toBe(false);
    });

  test.each(VALUES)
    ("Returns false is if it's not Object", (value) => {
      expect(hasLength(value)).toBeTruthy();
    });

  test.each(EMPTY_VALUES)
    ("Returns false is if it's not Object", (value) => {
      expect(hasLength(value)).toBeFalsy();
    });

  test.each(OVERSIZED_VALUES)
    ("Verifies if an input is oversized", (partitionKey) => {
      const event = { partitionKey }
      expect(keyIsOversized(event)).toBe(true);
    });

  test.each(VALUES)
    ("Returns a hash string", (input) => {
      const trivialKey = createHash(input);
      const HASH_PATTERN = /[a-z0-9]/g;

      expect(HASH_PATTERN.test(trivialKey)).toBe(true);
    });
});
