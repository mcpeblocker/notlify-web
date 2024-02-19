import express from "express";
import { auth } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { createBotSchema } from "../schemas/bots/createBot.schema";

const router = express.Router();

router.use(auth);

// Create bot
router.post("/", validate(createBotSchema, "body"), (req, res) => {
  res.send("Create bot");
});

// Get bot
router.get("/:id", (req, res) => {
  res.send("Get bot");
});

// Delete bot
router.delete("/:id", (req, res) => {
  res.send("Delete bot");
});

export default router;
