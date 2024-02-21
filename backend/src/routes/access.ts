import express from "express";
import { auth } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { createAccessSchema } from "../schemas/access/createAccess.schema";
import accessController from "../controllers/access";

const router = express.Router();

router.use(auth);

// Create access to the bot
router.post("/", validate(createAccessSchema, "body"), accessController.add);

// Get access to the bot
router.get("/:id", accessController.get);

// Delete access
router.delete("/:id", accessController.destroy);

export default router;
