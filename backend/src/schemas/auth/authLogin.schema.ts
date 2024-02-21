import Joi from "joi";
import joiCustomErrorMessage from "../../utils/joiCustomErrorMessage";
import regexs from "../../utils/regexs";

export const authLoginSchema = Joi.object({
  email: Joi.string().email().required().messages(joiCustomErrorMessage("email")),
  password: Joi.string().min(8).max(30).regex(regexs.userPassword).required().messages(joiCustomErrorMessage("password")),
});