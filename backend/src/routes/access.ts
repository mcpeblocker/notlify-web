import express from "express";
import { auth } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { createAccessSchema } from "../schemas/access/createAccess.schema";

const router = express.Router();

router.use(auth);

// Create access to the bot
router.post("/", validate(createAccessSchema, "body"), (req, res) => {
  res.send("Create access to the bot");
});

// Get access to the bot
router.get("/:id", (req, res) => {
  res.send("Get access to the bot");
});

// Delete access
router.delete("/:id", (req, res) => {
  res.send("Delete access");
});

export default router;
