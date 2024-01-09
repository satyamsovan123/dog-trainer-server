const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const {
  statusCodeConstant,
  userActionConstant,
} = require("../../../constants");
const { Data, CourseDetail } = require("../../models");
const { checkExistingData } = require("./utils/dataManipulationHelper");
const fs = require("fs");
const path = require("path");

const addData = async (req, res) => {
  try {
    const userData = req.body;
    // const topics = [];
    // userData.title = ``;
    // userData.data = ``;

    const existingData = await checkExistingData(userData.title);
    if (existingData !== null) {
      const generatedResponse = responseBuilder(
        {},
        userActionConstant.DATA_ALREADY_PRESENT,
        statusCodeConstant.ALREADY_EXISTS
      );

      return res.status(generatedResponse.code).send(generatedResponse);
    }
    const newData = await Data.create(
      new Data({
        title: userData.title,
        data: userData.data,
        email: userData.email,
      })
    );
    if (!newData) {
      const generatedResponse = responseBuilder(
        {},
        userActionConstant.ADD_DATA_ERROR,
        statusCodeConstant.ERROR
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(
      newData,
      userActionConstant.ADD_DATA_SUCCESS,
      statusCodeConstant.SUCCESS
    );

    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      userActionConstant.ADD_DATA_ERROR,
      statusCodeConstant.ERROR
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { addData };
