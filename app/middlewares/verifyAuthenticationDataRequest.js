const {
  responseConstant,
  serverConstant,
  userActionConstant,
  statusCodeConstant,
} = require("../../constants");
const { logger } = require("../../utils");
const { responseBuilder } = require("../../utils/responseBuilder");

const jwt = require("jsonwebtoken");
const {
  checkExistingUser,
} = require("../controllers/authentication/utils/authenticationHelper");
const { AuthenticationDataValidator, User } = require("../models");

const verifyAuthenticationDataRequest = async (req, res, next) => {
  try {
    const userData = req.body;
    const currentRoute = req.originalUrl;

    const dataValidationResult = await new AuthenticationDataValidator(
      userData
    ).getValidationResult();
    if (dataValidationResult) {
      const generatedResponse = responseBuilder(
        {},
        dataValidationResult,
        statusCodeConstant.INVALID
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const existingUser = await checkExistingUser(userData.email);

    if (existingUser && currentRoute === "/api/signup") {
      logger("inside signup and user exists");
      const generatedResponse = responseBuilder(
        {},
        userActionConstant.USER_ALREADY_EXISTS,
        statusCodeConstant.ALREADY_EXISTS
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    } else if (!existingUser && currentRoute === "/api/authentication") {
      logger("inside authentication and user does not exists");
      const generatedResponse = responseBuilder(
        {},
        userActionConstant.USER_NOT_FOUND,
        statusCodeConstant.NOT_FOUND
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    } else if (existingUser && currentRoute === "/api/authentication") {
      logger("inside authentication and user exists");
      req.body["hashedPassword"] = existingUser.password;
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

module.exports = { verifyAuthenticationDataRequest };
