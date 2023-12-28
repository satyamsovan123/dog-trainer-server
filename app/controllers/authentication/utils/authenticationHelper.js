const { logger } = require("../../../../utils");
const { User } = require("../../../models");
const bcrypt = require("bcrypt");
const saltRounds = Number(appConfig.saltRounds);
const jwt = require("jsonwebtoken");

const checkExistingUser = async (email) => {
  let cursorData = null;
  if (!email) {
    return cursorData;
  }
  await User.findOne({ email: email })
    .select("email password")
    .then((result) => {
      cursorData = result;
    })
    .catch((error) => {
      logger(error);
      cursorData = null;
    });
  return cursorData;
};

const comparePassword = async (password, hash) => {
  if (!password || !hash) {
    return false;
  }
  try {
    const result = await bcrypt.compare(password, hash);
    return result;
  } catch (error) {
    logger(error);
    return false;
  }
};

const generateJWT = async (data) => {
  if (!data) {
    return "";
  }
  try {
    const token = jwt.sign(data, appConfig.jwtSecret, {
      expiresIn: appConfig.jwtExpiresIn,
    });
    return token;
  } catch (error) {
    logger(error);
    return "";
  }
};

const encryptPassword = async (password) => {
  if (!password) {
    return "";
  }
  try {
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    return encryptedPassword;
  } catch (error) {
    logger(error);
    return "";
  }
};

module.exports = {
  checkExistingUser,
  comparePassword,
  generateJWT,
  encryptPassword,
};
