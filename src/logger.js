const bunyan = require("bunyan");
const { LoggingBunyan } = require("@google-cloud/logging-bunyan");

const logger = bunyan.createLogger({
  name: "gcp-serverless-demo",
  streams: [
    {
      stream: process.stdout,
      level: "debug",
    },
    new LoggingBunyan().stream("debug"),
  ],
});

module.exports = logger;
