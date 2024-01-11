const Joi = require("joi");
const { userActionConstant, serverConstant } = require("../../../constants");

class PetProfileRequestValidator {
  constructor(data = {}) {
    this.data = data;
    this.validatorSchema = Joi.object({
      email: Joi.string()
        .required()
        .email()
        .messages({
          "string.email": `${userActionConstant.EMAIL} ${userActionConstant.IS_INVALID} ${userActionConstant.PROVIDE_VALID_DATA}`,
          "string.empty": `${userActionConstant.EMAIL} ${userActionConstant.IS_EMPTY} ${userActionConstant.PROVIDE_VALID_DATA}`,
          "any.required": `${userActionConstant.EMAIL} ${userActionConstant.IS_REQUIRED} ${userActionConstant.PROVIDE_VALID_DATA}`,
        }),
      petName: Joi.string()
        .required()
        .allow("")
        .messages({
          "any.required": `${userActionConstant.PET_NAME} ${userActionConstant.IS_REQUIRED} ${userActionConstant.PROVIDE_VALID_DATA}`,
        }),
      petBreed: Joi.string()
        .required()
        .allow("")

        .messages({
          "any.required": `${userActionConstant.PET_BREED} ${userActionConstant.IS_REQUIRED} ${userActionConstant.PROVIDE_VALID_DATA}`,
        }),
      petGender: Joi.string()
        .required()
        .allow("")

        .messages({
          "any.required": `${userActionConstant.PET_GENDER} ${userActionConstant.IS_REQUIRED} ${userActionConstant.PROVIDE_VALID_DATA}`,
        }),
      petDOB: Joi.date()
        .required()
        .allow("")

        .messages({
          "date.base": `${userActionConstant.PET_DOB} ${userActionConstant.IS_INVALID} ${userActionConstant.PROVIDE_VALID_DATA}`,
          "any.required": `${userActionConstant.PET_DOB} ${userActionConstant.IS_REQUIRED} ${userActionConstant.PROVIDE_VALID_DATA}`,
        }),
      petWeight: Joi.array()
        .items({
          weight: Joi.number(),
          date: Joi.string(),
          age: Joi.string(),
        })
        .messages({
          "any.required": `${userActionConstant.PET_GENDER} ${userActionConstant.IS_REQUIRED} ${userActionConstant.PROVIDE_VALID_DATA}`,
        }),
    }).messages({
      "object.unknown": `${userActionConstant.REDUNDANT_DATA}`,
    });
    this.validationResult = this.validatorSchema.validateAsync(data);
  }

  async getValidationResult() {
    try {
      await this.validationResult;
    } catch (error) {
      console.log(error);
      return error?.message ?? serverConstant.ERROR_OCCURRED_WHILE_VERIFYING;
    }
  }
}

module.exports = { PetProfileRequestValidator };
