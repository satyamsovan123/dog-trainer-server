const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const {
  statusCodeConstant,
  userActionConstant,
  serverConstant,
} = require("../../../constants");

const {
  comparePassword,
  generateJWT,
} = require("./utils/authenticationHelper");

const authentication = async (req, res) => {
  try {
    const userData = req.body;
    const isPasswordValid = await comparePassword(
      userData.password,
      userData.hashedPassword
    );
    if (!isPasswordValid) {
      const generatedResponse = responseBuilder(
        {},
        userActionConstant.PROVIDE_VALID_CREDENTIALS,
        statusCodeConstant.UNAUTHORIZED
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const token = await generateJWT({ email: userData.email });
    const generatedResponse = responseBuilder(
      {},
      userActionConstant.SIGN_IN_SUCCESS,
      statusCodeConstant.SUCCESS
    );
    return res
      .setHeader(serverConstant.AUTHORIZATION_HEADER_KEY, `Bearer ${token}`)
      .status(generatedResponse.code)
      .send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      userActionConstant.SIGN_IN_ERROR,
      statusCodeConstant.ERROR
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { authentication };
