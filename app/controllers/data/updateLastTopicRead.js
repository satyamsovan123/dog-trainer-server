const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const {
  statusCodeConstant,
  userActionConstant,
} = require("../../../constants");
const { checkExistingData } = require("./utils/dataManipulationHelper");
const { CourseDetail, User } = require("../../models");

const updateLastTopicRead = async (req, res) => {
  try {
    const userData = req.body;
    const lastTopicRead = {
      courseName: userData.courseName ?? "",
      topic: userData.topic ?? "",
    };
    const data = await User.findOneAndUpdate(
      { email: userData.email },
      {
        lastTopicRead: lastTopicRead,
      }
    ).select("lastTopicRead");
    if (!data) {
      const generatedResponse = responseBuilder(
        {},
        userActionConstant.UPDATE_LAST_TOPIC_READ_ERROR,
        statusCodeConstant.ERROR
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(
      data,
      userActionConstant.UPDATE_LAST_TOPIC_READ_SUCCESS,
      statusCodeConstant.SUCCESS
    );

    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      userActionConstant.UPDATE_LAST_TOPIC_READ_ERROR,
      statusCodeConstant.ERROR
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { updateLastTopicRead };
