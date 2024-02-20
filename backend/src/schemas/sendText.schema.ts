import Joi from "joi";

export const sendTextSchema = Joi.object({
  accessToken: Joi.string().required(),
  ucode: Joi.string().required(),
  text: Joi.string().required(),
});
