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

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    const decodedData = jwt.verify(token, appConfig.jwtSecret);
    const existingUser = await checkExistingUser(decodedData?.email);
    if (decodedData?.email !== existingUser?.email) {
      const generatedResponse = responseBuilder(
        {},
        userActionConstant.PLEASE_SIGN_IN,
        statusCodeConstant.UNAUTHORIZED
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    req.body["email"] = decodedData?.email;

    next();
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      userActionConstant.TOKEN_INVALID,
      statusCodeConstant.UNAUTHORIZED
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { verifyJWT };
