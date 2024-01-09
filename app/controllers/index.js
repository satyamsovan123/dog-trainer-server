const { signUp } = require("./authentication/signUp");
const { authentication } = require("./authentication/authentication");
const { getAllData, getDataByTitle } = require("./data/getData");
const { addData } = require("./data/addData");

const {
  checkExistingUser,
  comparePassword,
  generateJWT,
  encryptPassword,
} = require("./authentication/utils/authenticationHelper");

const { checkExistingData } = require("./data/utils/dataManipulationHelper");
const { getCourseDetails } = require("./data/getCourseDetails");
const { getPetProfile } = require("./petProfile/getPetProfile");
const { updatePetProfile } = require("./petProfile/updatePetProfile");

module.exports = {
  signUp,
  authentication,
  getAllData,
  getDataByTitle,
  addData,
  checkExistingUser,
  comparePassword,
  generateJWT,
  encryptPassword,
  checkExistingData,
  getCourseDetails,
  getPetProfile,
  updatePetProfile,
};
