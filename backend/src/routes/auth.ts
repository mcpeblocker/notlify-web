import express from "express";
import { auth } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { authLoginSchema } from "../schemas/auth/authLogin.schema";
import { authRegisterSchema } from "../schemas/auth/authRegister.schema";

const router = express.Router();

// Login
router.post("/login", validate(authLoginSchema, "body"), (req, res) => {
  res.send("Login");
});

// Register
router.post("/register", validate(authRegisterSchema, "body"), (req, res) => {
  res.send("Register");
});

// Logout
router.post("/logout", auth, (req, res) => {
  res.send("Logout");
});

// Get user
router.get("/", auth, (req, res) => {
  res.send("Get user");
});

export default router;
