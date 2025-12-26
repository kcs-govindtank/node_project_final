var _a;
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { OtpType } from "../generated/prisma/enums.js";
import { generaeOTP, getOtpExpireTime } from "../utils/otp.js";
import { generateToken } from "../utils/jwt.js";
const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
class AuthServices {
}
_a = AuthServices;
// register new user
AuthServices.register = async (firstName, lastName, email, mobileNumber, countryCode, gender, age) => {
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
AuthServices.findMobileNumber = async (mobileNumber) => {
    const user = await prisma.user.findUnique({
        where: { mobileNumber: mobileNumber },
    });
    return user;
};
// login user and generate OTP
AuthServices.loginUser = async (mobileNumber, countryCode) => {
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
    console.log("LOGIN OTP:", otp);
    return {
        success: true,
        data: {
            mobileNo: user.mobileNumber,
            countryCode: user.countryCode,
            isRegidtered: true,
            otpSent: true,
        },
    };
};
AuthServices.verifyOTP = async (mobileNumber, countryCode, otpCode) => {
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
export default AuthServices;
//# sourceMappingURL=authServices.js.map