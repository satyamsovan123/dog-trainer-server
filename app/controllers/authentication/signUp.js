const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const {
  statusCodeConstant,
  userActionConstant,
  serverConstant,
} = require("../../../constants");
const {
  AuthenticationDataValidator,
  User,
  PetProfile,
} = require("../../models");
const {
  checkExistingUser,
  generateJWT,
  encryptPassword,
} = require("./utils/authenticationHelper");

const signUp = async (req, res) => {
  try {
    const userData = req.body;
    const encryptedPassword = await encryptPassword(userData.password);

    const newPetProfile = new PetProfile({
      email: userData.email,
      petName: "Shadow",
      petBreed: "German Shepherd",
      petGender: "Male",
      petDOB: new Date(),
    });

    await PetProfile.create(newPetProfile);

    const newUser = new User({
      email: userData.email,
      password: encryptedPassword,
      petProfile: newPetProfile._id,
    });

    await User.create(newUser);

    const token = await generateJWT({ email: userData.email });
    const generatedResponse = responseBuilder(
      {},
      userActionConstant.SIGN_UP_SUCCESS,
      statusCodeConstant.SUCCESS
    );
    return res
      .setHeader(serverConstant.AUTHORIZATION_HEADER_KEY, `Bearer ${token}`)
      .status(generatedResponse.code)
      .send(generatedResponse);
  } catch (error) {
    logger(error);
    const generatedResponse = responseBuilder(
      {},
      userActionConstant.SIGN_UP_ERROR,
      statusCodeConstant.ERROR
    );
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { signUp };
