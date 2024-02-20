import express from "express";
import { validate } from "../middlewares/validate";
import { sendTextSchema } from "../schemas/sendText.schema";
import { AccessModel } from "../models/Access.model";
import { BotModel } from "../models/Bot.model";
import BotApiService from "../services/bot-api.service";

const router = express.Router();

router.post("/text", validate(sendTextSchema, "body"), async (req, res) => {
  const { accessToken, ucode, text } = req.body;
  const domain = req.hostname;
  //   Authorize the client: Verify domain, access token
  // TODO: write custom aggregation to query the bot details based on given access token, domain and ucode
  const access = await AccessModel.findOne({ accessToken, domain });
  if (!access) {
    return res.status(401).json({ message: "Unauthorized." });
  }
  const bot = await BotModel.findById(access.bot);
  if (!bot) {
    return res.status(400).json({ message: "Broken credentials provided." });
  }
  if (ucode !== bot.ucode) {
    return res.status(401).json({ message: "Wrong credentials provided." });
  }

  const chatId = access.chatId;
  //   Send the message
  const botApiService = new BotApiService(bot.token);
  const result = await botApiService.sendMessage(chatId, text);
  if (!result.ok) {
    return res.status(500).json({ success: false, error: result.message });
  }
  res.status(200).json({ success: true, message: result.message });
});

export default router;
