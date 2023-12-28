const mongoose = require("mongoose");
const { logger, overengineedBoxifier, getServerDetails } = require("../utils");

const { serverConstant, statusCodeConstant } = require("../constants");
const { responseBuilder } = require("../utils/responseBuilder");
require("dotenv").config();
async function connectToMongoDB() {
  const url = appConfig.databaseURL;
  const options = { useNewUrlParser: true, useUnifiedTopology: true };
  mongoose.connect(url, options).then(
    () => {
      getServerDetails();
      overengineedBoxifier([serverConstant.DATABASE_CONNECTION_SUCCESS]);
    },
    (error) => {
      const generatedResponse = responseBuilder(
        {},
        serverConstant.DATABASE_CONNECTION_ERROR,
        statusCodeConstant.ERROR
      );
      overengineedBoxifier([error?.message ?? generatedResponse.message]);
      return generatedResponse;
    }
  );
}

module.exports = { connectToMongoDB };
