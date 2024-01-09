const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const {
  statusCodeConstant,
  userActionConstant,
} = require("../../../constants");
const { checkExistingData } = require("../data/utils/dataManipulationHelper");
const { CourseDetail, User, PetProfile } = require("../../models");

const getPetProfile = async (req, res) => {
  try {
    const userData = req.body;
    const petProfile = await PetProfile.findOne({
      email: userData.email,
    }).select("-_id -__v -createdAt -updatedAt -email");
    const generatedResponse = responseBuilder(
      { petProfile },
      userActionConstant.GET_PET_PROFILE_SUCCESS,
      statusCodeConstant.SUCCESS
    );

    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    const generatedResponse = responseBuilder(
      {},
      userActionConstant.GET_PET_PROFILE_ERROR,
      statusCodeConstant.ERROR
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { getPetProfile };
