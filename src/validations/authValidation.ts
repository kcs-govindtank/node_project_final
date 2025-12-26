import { z } from "zod";
import { Gender } from "../generated/prisma/enums.ts";

export const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  emailId: z.string().email("Please enter a valid email address"),
  mobileNo: z.string().min(10, "Mobile number must be at least 10 digits"),
  countryCode: z.string().min(1, "Country code is required"),
  gender: z.nativeEnum(Gender, {
    error: `Gender must be one of: ${Object.values(Gender).join(", ")}`
  }),
  age: z.number().min(1, "Age must be at least 1"),
});

export const loginSchema = z.object({
  mobileNo: z.string().min(10, "Mobile number must be at least 10 digits"),
  countryCode: z.string().min(1, "Country code is required"),
});

export const verifyOtpSchema = z.object({
  mobileNo: z.string().min(10, "Mobile number must be at least 10 digits"),
  countryCode: z.string().min(1, "Country code is required"),
  otp: z.string().length(6, "OTP must be exactly 6 digits"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;