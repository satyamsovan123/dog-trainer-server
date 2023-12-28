const Data = require("./databaseModels/Data");
const User = require("./databaseModels/User");

const {
  AuthenticationDataValidator,
} = require("./requestValidators/AuthenticationDataValidator");

const {
  GetDataByTitleRequestValidator,
} = require("./requestValidators/GetDataByTitleRequestValidator");

const { PostDataValidator } = require("./requestValidators/PostDataValidator");
const CourseDetail = require("./databaseModels/CourseDetail");

module.exports = {
  Data,
  User,
  CourseDetail,
  PostDataValidator,
  AuthenticationDataValidator,
  GetDataByTitleRequestValidator,
};
