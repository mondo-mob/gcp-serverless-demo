const { BigQuery } = require("@google-cloud/bigquery");
const fs = require("fs");
const config = require("./config");
const logger = require("./logger");

const { location, datasetName, tableName } = config.bigQuery;

const client = new BigQuery();

const init = async () => {
  const response = {};
  try {
    logger.info(`Creating BigQuery dataset: ${datasetName}`);
    const [dataset] = await client.dataset(datasetName).get({ autoCreate: true, location });

    logger.info(`Creating BigQuery table: ${datasetName}.${tableName}`);
    const schema = JSON.parse(fs.readFileSync("./requests.json", "utf8"));
    const [table] = await dataset.table(tableName).get({ autoCreate: true, location, schema });

    response.dataset = await dataset.getMetadata();
    response.table = await table.getMetadata();
  } catch (error) {
    logger.error(`Error initialising BigQuery: ${error.message}`);
    response.error = error;
  }
  return response;
};

const saveRequest = async (request) => {
  try {
    logger.info(`Inserting into table: ${datasetName}.${tableName}`);
    const [response] = await client.dataset(datasetName).table(tableName).insert([request]);
    return response;
  } catch (error) {
    logger.error(`Error saving request: ${error.message}`);
    return error;
  }
};

module.exports = {
  init,
  saveRequest,
};
