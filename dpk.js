const { createHash, keyIsOversized, noDataInside } = require("./utils");

exports.deterministicPartitionKey = (event, trivialKey = "0") => {
  if (noDataInside(event)) return trivialKey;
  if (keyIsOversized(event)) return createHash(event.partitionKey);
  if (noDataInside(event.partitionKey )) return createHash(event);

  const partitionKeyString = JSON.stringify(event.partitionKey);
  return partitionKeyString;
};