const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  /**
   * Return a hash based on the input, algorithm and enconding passed.
   * @param {String} input - The data to be hashed
   * @param {String} hashOption - The algorithm that will be use to hash. Ex: "sha3-512"
   * @param {String} binaryToTextEnconding - The enconding used to digest the hash
   * @returns {String}
   */
  const createHash = (input, hashOption = "sha3-512", binaryToTextEnconding = "hex") => {
    return crypto
      .createHash(hashOption)
      .update(data)
      .digest(binaryToTextEnconding);
  }

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = createHash(data);
    }
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = createHash(candidate);
  }
  return candidate;
};