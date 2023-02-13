const crypto = require("crypto");

const MAX_PARTITION_KEY_LENGTH = 256;

const createHash = (input, hashOption = "sha3-512", binaryToTextEnconding = "hex") => {
  return crypto
    .createHash(hashOption)
    .update(JSON.stringify(input))
    .digest(binaryToTextEnconding);
};

const isDate = (data) => data instanceof Date
const isString = (data) => typeof data === 'string';
const isNumber = (data) => typeof data === 'number';
const isObject = (data) => Object.prototype.toString.call(data) === '[object Object]'

const hasLength = (data) => {
  if (isNumber(data)) return data.toString().length;
  if (isObject(data)) return Object.keys(data).length;
  if (Array.isArray(data) || isString(data)) return data.length;
  if (isDate(data)) return data.toUTCString().length;

  return 0;
}

const noDataInside = (event) => {
  if (!event) return true;
  if (!hasLength(event)) return true;

  return false;
};

const keyIsOversized = (event, maxLength = MAX_PARTITION_KEY_LENGTH) => {
  return event && event.partitionKey && (hasLength(event.partitionKey) > maxLength);
}

module.exports = {
  createHash,
  hasLength,
  isDate,
  isNumber,
  isObject,
  isString,
  keyIsOversized,
  MAX_PARTITION_KEY_LENGTH,
  noDataInside,
};
