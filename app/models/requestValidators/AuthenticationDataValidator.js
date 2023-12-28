const Joi = require("joi");
const { userActionConstant, serverConstant } = require("../../../constants");

class AuthenticationDataValidator {
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

      password: Joi.string()
        .min(6)
        .required()
        .messages({
          "string.empty": `${userActionConstant.PASSWORD} ${userActionConstant.IS_EMPTY} ${userActionConstant.PROVIDE_VALID_DATA}`,
          "string.min": `${userActionConstant.PASSWORD} ${userActionConstant.SHOULD_HAVE} at least {#limit} characters. ${userActionConstant.PROVIDE_VALID_DATA}`,
          "any.required": `${userActionConstant.PASSWORD} ${userActionConstant.IS_REQUIRED} ${userActionConstant.PROVIDE_VALID_DATA}`,
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
      return error?.message ?? serverConstant.ERROR_OCCURRED_WHILE_VERIFYING;
    }
  }
}

module.exports = { AuthenticationDataValidator };
