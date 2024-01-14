const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const {
  statusCodeConstant,
  userActionConstant,
} = require("../../../constants");
const { checkExistingData } = require("./utils/dataManipulationHelper");
const { CourseDetail, User } = require("../../models");

const getLastTopicRead = async (req, res) => {
  try {
    const userData = req.body;
    const data = await User.findOne({ email: userData.email }).select(
      "lastTopicRead"
    );
    if (!data) {
      const generatedResponse = responseBuilder(
        {},
        userActionConstant.GET_ALL_DATA_ERROR,
        statusCodeConstant.ERROR
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(
      data,
      userActionConstant.GET_ALL_COURSE_DETAILS_SUCCESS,
      statusCodeConstant.SUCCESS
    );

    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      userActionConstant.GET_ALL_COURSE_DETAILS_ERROR,
      statusCodeConstant.ERROR
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { getLastTopicRead };
