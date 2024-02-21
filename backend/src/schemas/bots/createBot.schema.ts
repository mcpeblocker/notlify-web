import Joi from "joi";
import joiCustomErrorMessage from "../../utils/joiCustomErrorMessage";
import regexs from "../../utils/regexs";

export const createBotSchema = Joi.object({
  name: Joi.string().required().min(3).max(30).messages(joiCustomErrorMessage("name")),
  token: Joi.string().required().regex(regexs.botToken).messages(joiCustomErrorMessage("token")),
});
