const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const {
  statusCodeConstant,
  userActionConstant,
} = require("../../../constants");
const { checkExistingData } = require("./utils/dataManipulationHelper");
const { CourseDetail } = require("../../models");

const getCourseDetails = async (req, res) => {
  try {
    const data = await CourseDetail.find({}).select("courseName topics -_id");
    if (!data) {
      const generatedResponse = responseBuilder(
        {},
        userActionConstant.NO_DATA_FOUND,
        statusCodeConstant.NOT_FOUND
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

module.exports = { getCourseDetails };
