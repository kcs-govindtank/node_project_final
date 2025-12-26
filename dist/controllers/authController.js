var _a;
import AuthServices from "../services/authServices.js";
class AuthController {
}
_a = AuthController;
AuthController.register = async (req, res) => {
    try {
        const { firstName, lastName, emailId, mobileNo, countryCode, gender, age, } = req.body;
        if (!mobileNo ||
            !countryCode ||
            !firstName ||
            !lastName ||
            !emailId ||
            !gender ||
            !age) {
            return res
                .status(400)
                .json({ status: false, message: "All fields are required" });
        }
        const existingUser = await AuthServices.findMobileNumber(mobileNo);
        if (existingUser) {
            return res
                .status(409)
                .json({ status: false, message: "User already exists" });
        }
        else {
            const user = await AuthServices.register(firstName, lastName, emailId, mobileNo, countryCode, gender, age);
            return res.status(200).json({
                status: true,
                message: "User created successfully.",
                data: user,
            });
        }
    }
    catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};
AuthController.login = async (req, res) => {
    try {
        const { mobileNo, countryCode } = req.body;
        if (!mobileNo || !countryCode) {
            return res
                .status(400)
                .json({ status: false, message: "All fields are required" });
        }
        const result = await AuthServices.loginUser(mobileNo, countryCode);
        if (!result.success) {
            return res.status(404).json({
                status: false,
                message: result.message,
                errorCode: result.errorCode,
                data: result.data,
            });
        }
        return res.status(200).json({
            status: true,
            message: "OTP has been sent successfully.",
            data: result.data,
        });
    }
    catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};
AuthController.verifyOtp = async (req, res) => {
    try {
        const { mobileNo, countryCode, otp } = req.body;
        if (!mobileNo || !countryCode || !otp) {
            return res
                .status(400)
                .json({ status: false, message: "All fields are required" });
        }
        const result = await AuthServices.verifyOTP(mobileNo, countryCode, otp);
        if (!result.success) {
            return res.status(400).json({
                status: false,
                message: result.message,
                errorCode: result.errorCode,
                data: result.data,
            });
        }
        return res.status(200).json({
            status: true,
            message: "OTP verified successfully.",
            data: result.data,
        });
    }
    catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};
export default AuthController;
//# sourceMappingURL=authController.js.map