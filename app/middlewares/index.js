const { verifyJWT } = require("./verifyJWT");
const {
  verifyAuthenticationDataRequest,
} = require("./verifyAuthenticationDataRequest");
const { verifyPostDataRequest } = require("./verifyPostDataRequest");

const {
  verifyGetDataByTitleRequest,
} = require("./verifyGetDataByTitleRequest");

module.exports = {
  verifyJWT,
  verifyPostDataRequest,
  verifyAuthenticationDataRequest,
  verifyGetDataByTitleRequest,
};
