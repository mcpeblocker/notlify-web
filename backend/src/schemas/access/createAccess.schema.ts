import Joi from "joi";
import regexs from "../../utils/regexs";
import joiCustomErrorMessage from "../../utils/joiCustomErrorMessage";

export const createAccessSchema = Joi.object({
  botId: Joi.string()
    .required()
    .regex(regexs.mongoDbID)
    .messages(joiCustomErrorMessage("botId")),
  domain: Joi.string()
    .domain()
    .required()
    .messages(joiCustomErrorMessage("domain")),
  chatId: Joi.string().required().messages(joiCustomErrorMessage("chatId")),
});
