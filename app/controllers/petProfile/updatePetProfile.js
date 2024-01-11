const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const {
  statusCodeConstant,
  userActionConstant,
} = require("../../../constants");
const { checkExistingData } = require("../data/utils/dataManipulationHelper");
const { CourseDetail, User, PetProfile } = require("../../models");

const updatePetProfile = async (req, res) => {
  try {
    const userData = req.body;

    const updateData = new PetProfile({
      email: userData.email,
      petName: userData.petName,
      petBreed: userData.petBreed,
      petGender: userData.petGender,
      petDOB: userData.petDOB,
      petWeight: userData.petWeight,
    });

    const tempPetProfile = await PetProfile.findOneAndUpdate(
      { email: userData.email },
      {
        petName: userData.petName,
        petBreed: userData.petBreed,
        petGender: userData.petGender,
        petDOB: userData.petDOB,
        petWeight: userData.petWeight,
      }
    );
    if (!tempPetProfile) {
      const generatedResponse = responseBuilder(
        {},
        userActionConstant.UPDATE_PET_PROFILE_ERROR,
        statusCodeConstant.ERROR
      );
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const generatedResponse = responseBuilder(
      { tempPetProfile },
      userActionConstant.UPDATE_PET_PROFILE_SUCCESS,
      statusCodeConstant.SUCCESS
    );

    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    console.log(error);

    const generatedResponse = responseBuilder(
      {},
      userActionConstant.UPDATE_PET_PROFILE_ERROR,
      statusCodeConstant.ERROR
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { updatePetProfile };
