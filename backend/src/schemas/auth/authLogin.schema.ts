import Joi from "joi";

export const authLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});