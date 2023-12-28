const {
  responseConstant,
  serverConstant,
  userActionConstant,
  statusCodeConstant,
} = require("../../constants");
const { logger } = require("../../utils");
const { responseBuilder } = require("../../utils/responseBuilder");
const { PostDataValidator } = require("../models");

const verifyPostDataRequest = async (req, res, next) => {
  try {
    const data = req.body;

    const dataValidationResult = await new PostDataValidator(
      data
    ).getValidationResult();

    if (dataValidationResult) {
      const generatedResponse = responseBuilder(
        {},
        dataValidationResult,
        statusCodeConstant.INVALID
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    next();
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      serverConstant.ERROR_OCCURRED_WHILE_VERIFYING,
      statusCodeConstant.ERROR
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { verifyPostDataRequest };
