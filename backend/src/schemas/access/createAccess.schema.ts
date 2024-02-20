import Joi from "joi";

export const createAccessSchema = Joi.object({
  botId: Joi.string().required(),
  userId: Joi.string().required(),
  domain: Joi.string().domain().required(),
  chatId: Joi.string().required(),
});
