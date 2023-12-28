const { logger } = require("../../../../utils");
const { Data } = require("../../../models");
const bcrypt = require("bcrypt");
const saltRounds = Number(appConfig.saltRounds);
const jwt = require("jsonwebtoken");

const checkExistingData = async (title) => {
  let cursorData = null;
  if (!title) {
    return cursorData;
  }
  await Data.findOne({ title: title })
    .select("title data -_id")
    .then((result) => {
      cursorData = result;
    })
    .catch((error) => {
      logger(error);
      cursorData = null;
    });
  return cursorData;
};

module.exports = {
  checkExistingData,
};
