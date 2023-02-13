const crypto = require("crypto");

const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  const NULISH_VALUES = [, null, undefined, '', NaN, {}, [], false]

  it("Returns the same partition key if one is provided in the event", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: "Speak Friend" });
    expect(JSON.parse(trivialKey)).toBe("Speak Friend");
  });

  test.each([
    42,
    true,
    new Date(),
    { clean: "code" },
    [1, 2, 3],
  ])
    ("Returns a string when the provided parition key is not a string", () => {
      const trivialKey = deterministicPartitionKey({ partitionKey: 42 });
      expect(trivialKey).toBe("42");
    })

  test.each(NULISH_VALUES)
    ("Returns the literal '0' when given no input", (input) => {
      const trivialKey = deterministicPartitionKey(input);
      const expectedTrivialKey = "0";
      expect(trivialKey).toBe(expectedTrivialKey);
    });

  test.each(NULISH_VALUES)
    ("Return a hash string when event does not has a partition key defined", (partitionKey) => {
      const trivialKey = deterministicPartitionKey({ partitionKey });
      const HASH_PATTERN = /[a-z0-9]/g;

      expect(HASH_PATTERN.test(trivialKey)).toBe(true);
    });

  const bigArray = Array(267).fill("7");
  const bigObejct = {};
  let bigString = '';

  bigArray.forEach((item, index) => {
    bigObejct[index] = item;
    bigString += item; 
  });
  
  test.each([bigArray, bigObejct, bigString])
    ("Returns a hash when the partition key exceeds max length", (partitionKey) => {
      const trivialKey = deterministicPartitionKey({ partitionKey });
      const HASH_PATTERN = /[a-z0-9]/g;

      expect(HASH_PATTERN.test(trivialKey)).toBe(true);
    });
});
