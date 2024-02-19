import Joi from "joi";

export const createBotSchema = Joi.object({
  userId: Joi.number().required(),
  name: Joi.string().required(),
  token: Joi.string().token().required(),
});
