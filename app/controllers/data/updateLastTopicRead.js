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
    const data = await User.findOneAndUpdate(
      { email: userData.email },
      {
        lastTopicRead: userData.lastTopicRead ?? { courseName: "", topic: "" },
      }
    ).select("lastTopicRead");
    if (!data) {
      const generatedResponse = responseBuilder(
        {},
        userActionConstant.UPDATE_ALL_DATA_ERROR,
        statusCodeConstant.ERROR
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(
      data,
      userActionConstant.UPDATE_ALL_DATA_SUCCESS,
      statusCodeConstant.SUCCESS
    );

    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      userActionConstant.UPDATE_ALL_DATA_ERROR,
      statusCodeConstant.ERROR
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { updateLastTopicRead };
