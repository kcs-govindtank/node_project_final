import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Gender, OtpType } from "../generated/prisma/enums.js";
import { generaeOTP, getOtpExpireTime } from "../utils/otp.js";
import { generateToken } from "../utils/jwt.js";
import { error } from "node:console";
import { registerSchema, loginSchema, verifyOtpSchema } from "../validations/authValidation.ts";

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

class AuthServices {
  // register new user
  static register = async (
    firstName: string,
    lastName: string,
    email: string,
    mobileNumber: string,
    countryCode: string,
    gender: Gender,
    age: number
  ) => {
    // Validate input
    const validation = registerSchema.safeParse({
      firstName, lastName, emailId: email, mobileNo: mobileNumber,
      countryCode, gender, age
    });

    if (!validation.success) {
      throw new Error("Invalid input data");
    }

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        mobileNumber,
        countryCode,
        gender,
        age,
      },
    });
    return user;
  };

  // find user by mobile number
  static findMobileNumber = async (mobileNumber: string) => {
    const user = await prisma.user.findUnique({
      where: { mobileNumber: mobileNumber },
    });
    return user;
  };

  // login user and generate OTP
  static loginUser = async (mobileNumber: string, countryCode: string) => {
    const user = await prisma.user.findFirst({
      where: { mobileNumber: mobileNumber, countryCode: countryCode },
    });
    if (!user) {
      return {
        success: false,
        message: "Mobile number is not registered.",
        errorCode: "MOBILE_NOT_REGISTERED",
        data: {
          mobileNo: mobileNumber,
          countryCode: countryCode,
          isRegidtered: false,
        },
      };
      throw new Error("Mobile number is not registered.");
    }

    // User Found generate OTP
    const otp = generaeOTP();

    // remove existing OTPs for login
    await prisma.otp.deleteMany({
      where: { userId: user.id, type: OtpType.LOGIN },
    });

    // create new OTP for login
    await prisma.otp.create({
      data: {
        userId: user.id,
        otpCode: otp,
        type: OtpType.LOGIN,
        expiresAt: getOtpExpireTime(),
      },
    });

    // TODO: send OTP via SMS provider
    // Right now just logging to console
    
    console.log("LOGIN OTP:", otp);

    return {
      success: true,
      data: {
        mobileNo: user.mobileNumber,
        countryCode: user.countryCode,
        isRegistered: true,
        otpSent: true,
      },
    };
  };

  static verifyOTP = async (
    mobileNumber: string,
    countryCode: string,
    otpCode: string
  ) => {
    const user = await prisma.user.findFirst({
      where: { mobileNumber: mobileNumber, countryCode: countryCode },
    });
    if (!user) {
      return {
        success: false,
        message: "User Not Found",
        errorCode: "USER_NOT_FOUND",
      };
    }

    const otpRecord = await prisma.otp.findFirst({
      where: {
        userId: user.id,
        otpCode: otpCode,
        type: OtpType.LOGIN,
        expiresAt: {
          gte: new Date(),
        },
      },
    });

    console.log(otpRecord);
    if (!otpRecord) {
      return {
        success: false,
        errorCode: "INVALID_OTP",
        message: "Invalid OTP. Please try again.",
        data: {
          isVerified: false,
        },
      };
    }

    // OTP is valid, delete it
    await prisma.user.update({
      where: { id: user.id },
      data: { isVerified: true },
    });

    // Delete the OTP record
    await prisma.otp.deleteMany({
      where: { id: otpRecord.id },
    });

    const token = generateToken({
      userId: user.id,
      mobileNumber: user.mobileNumber,
    });

    return {
      status: true,
      message: "OTP Verified Successfully",
      data: {
        userId: user.id,
        mobileNo: user.mobileNumber,
        countryCode: user.countryCode,
        isRegistered: true,
        isVerified: true,
        token: token,
      },
    };
  };
}

export default AuthServices;
