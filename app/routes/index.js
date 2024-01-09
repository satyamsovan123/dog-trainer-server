const express = require("express");
const router = express.Router();
const { responseBuilder } = require("../../utils/responseBuilder");
const { serverConstant, statusCodeConstant } = require("../../constants/");

const baseURL = serverConstant.BASE_API;
router.use(baseURL, require("./authentication"));
router.use(baseURL, require("./data"));
router.use(baseURL, require("./petProfile"));

router.get("/", (req, res) => {
  try {
    const generatedResponse = responseBuilder(
      {},
      serverConstant.SERVER_IS_RUNNING,
      statusCodeConstant.SUCCESS
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    let generatedResponse = responseBuilder();
    return res.status(generatedResponse.code).send(generatedResponse);
  }
});

router.use("*", (req, res) => {
  try {
    const generatedResponse = responseBuilder(
      {},
      serverConstant.INVALID_API_PATH,
      statusCodeConstant.NOT_FOUND
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder();
    return res.status(generatedResponse.code).send(generatedResponse);
  }
});

module.exports = router;
