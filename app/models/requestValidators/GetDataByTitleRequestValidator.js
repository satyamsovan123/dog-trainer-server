const Joi = require("joi");
const { userActionConstant, serverConstant } = require("../../../constants");
const { logger } = require("../../../utils");

class GetDataByTitleRequestValidator {
  constructor(data = {}) {
    this.data = data;
    this.validatorSchema = Joi.object({
      email: Joi.string()
        .email()
        .messages({
          "string.email": `${userActionConstant.EMAIL} ${userActionConstant.IS_INVALID} ${userActionConstant.PROVIDE_VALID_DATA}`,
          "string.empty": `${userActionConstant.EMAIL} ${userActionConstant.IS_EMPTY} ${userActionConstant.PROVIDE_VALID_DATA}`,
          "any.required": `${userActionConstant.EMAIL} ${userActionConstant.IS_REQUIRED} ${userActionConstant.PROVIDE_VALID_DATA}`,
        }),
      title: Joi.string()
        .required()
        .messages({
          "string.empty": `${userActionConstant.TITLE} ${userActionConstant.IS_EMPTY} ${userActionConstant.PROVIDE_VALID_DATA}`,
          "any.required": `${userActionConstant.TITLE} ${userActionConstant.IS_REQUIRED} ${userActionConstant.PROVIDE_VALID_DATA}`,
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

module.exports = { GetDataByTitleRequestValidator };
