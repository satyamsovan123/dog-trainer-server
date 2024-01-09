const Data = require("./databaseModels/Data");
const User = require("./databaseModels/User");
const PetProfile = require("./databaseModels/PetProfile");
const CourseDetail = require("./databaseModels/CourseDetail");

const {
  AuthenticationDataValidator,
} = require("./requestValidators/AuthenticationDataValidator");

const {
  GetDataByTitleRequestValidator,
} = require("./requestValidators/GetDataByTitleRequestValidator");

const { PostDataValidator } = require("./requestValidators/PostDataValidator");

module.exports = {
  Data,
  User,
  PetProfile,
  CourseDetail,
  PostDataValidator,
  AuthenticationDataValidator,
  GetDataByTitleRequestValidator,
};
