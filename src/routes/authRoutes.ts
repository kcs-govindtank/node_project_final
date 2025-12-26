import express from "express";
import AuthServices from "../services/authServices.ts";
import AuthController from "../controllers/authController.ts";

const authRouter = express.Router();

// Login endpoint
authRouter.post("/login", AuthController.login);

// Register endpoint
authRouter.post("/register", AuthController.register);

// Verity OTP endpoint
authRouter.post("/verify-otp", AuthController.verifyOtp);

export default authRouter;