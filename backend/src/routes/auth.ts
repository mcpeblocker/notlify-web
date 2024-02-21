import express from "express";
import { auth } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { authLoginSchema } from "../schemas/auth/authLogin.schema";
import { authRegisterSchema } from "../schemas/auth/authRegister.schema";
import authController from "../controllers/auths";

const router = express.Router();

// Login
router.post("/login", validate(authLoginSchema, "body"), authController.login);

// Register
router.post("/register", validate(authRegisterSchema, "body"), authController.register);

// Logout
router.post("/logout", auth, authController.logout);

// Get user
router.get("/", auth, authController.getMe);

export default router;
