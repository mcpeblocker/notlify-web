import express from "express";
import { auth } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { createBotSchema } from "../schemas/bots/createBot.schema";
import botController from "../controllers/bot"
import { checkObjectId } from "../middlewares/checkObjectId";

const router = express.Router();

router.use(auth);

// Create bot
router.post("/", validate(createBotSchema, "body"), botController.add );

// Get bot
router.get("/:id",checkObjectId, botController.get);

// Delete bot
router.delete("/:id",checkObjectId, botController.destroy);

export default router;
