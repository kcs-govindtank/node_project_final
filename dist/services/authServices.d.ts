import { Gender } from "../generated/prisma/enums.js";
declare class AuthServices {
    static register: (firstName: string, lastName: string, email: string, mobileNumber: string, countryCode: string, gender: Gender, age: number) => Promise<runtime.Types.Result.GetResult<import("../generated/prisma/models.js").$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>>;
    static findMobileNumber: (mobileNumber: string) => Promise<any>;
    static loginUser: (mobileNumber: string, countryCode: string) => Promise<{
        success: boolean;
        message: string;
        errorCode: string;
        data: {
            mobileNo: string;
            countryCode: string;
            isRegidtered: boolean;
            otpSent?: never;
        };
    } | {
        success: boolean;
        data: {
            mobileNo: any;
            countryCode: any;
            isRegidtered: boolean;
            otpSent: boolean;
        };
        message?: never;
        errorCode?: never;
    }>;
    static verifyOTP: (mobileNumber: string, countryCode: string, otpCode: string) => Promise<{
        success: boolean;
        message: string;
        errorCode: string;
        data?: never;
        status?: never;
    } | {
        success: boolean;
        errorCode: string;
        message: string;
        data: {
            isVerified: boolean;
            userId?: never;
            mobileNo?: never;
            countryCode?: never;
            isRegistered?: never;
            token?: never;
        };
        status?: never;
    } | {
        status: boolean;
        message: string;
        data: {
            userId: any;
            mobileNo: any;
            countryCode: any;
            isRegistered: boolean;
            isVerified: boolean;
            token: string;
        };
        success?: never;
        errorCode?: never;
    }>;
}
export default AuthServices;
//# sourceMappingURL=authServices.d.ts.map