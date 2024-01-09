const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const {
  statusCodeConstant,
  userActionConstant,
} = require("../../../constants");
const { checkExistingData } = require("./utils/dataManipulationHelper");
const { Data, User } = require("../../models");

const getDataByTitle = async (req, res) => {
  try {
    const userData = req.body;
    const title = userData.title;

    const data = await checkExistingData(title);

    if (!data || data.length === 0) {
      const generatedResponse = responseBuilder(
        {},
        userActionConstant.NO_DATA_FOUND,
        statusCodeConstant.NOT_FOUND
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(
      data,
      userActionConstant.GET_DATA_BY_TITLE_SUCCESS,
      statusCodeConstant.SUCCESS
    );

    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      userActionConstant.GET_DATA_BY_TITLE_ERROR,
      statusCodeConstant.ERROR
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

const getAllData = async (req, res) => {
  try {
    const data = await Data.find({}).select("title data -_id");

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
      userActionConstant.GET_ALL_DATA_SUCCESS,
      statusCodeConstant.SUCCESS
    );

    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      userActionConstant.GET_ALL_DATA_ERROR,
      statusCodeConstant.ERROR
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { getDataByTitle, getAllData };
