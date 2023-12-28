const { overengineedBoxifier } = require("./overengineedBoxifier");

function getServerDetails() {
  const environment = appConfig.environment;
  const port = appConfig.port;
  const databaseName = appConfig.databaseName;
  const appName = appConfig.appName;

  const messages = [
    `Name: ${appName}`,
    `Status: Server is running on port ${port} in ${environment} environment.`,
    `Database: ${databaseName}`,
  ];

  overengineedBoxifier(messages);
}

module.exports = { getServerDetails };
