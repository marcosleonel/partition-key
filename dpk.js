const { createHash, keyIsOversized, noDataInside } = require("./utils");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";

  if (noDataInside(event)) return TRIVIAL_PARTITION_KEY;
  if (keyIsOversized(event)) return createHash(event.partitionKey);
  if (noDataInside(event.partitionKey )) return createHash(event);

  const partitionKeyString = JSON.stringify(event.partitionKey);
  return partitionKeyString;
};