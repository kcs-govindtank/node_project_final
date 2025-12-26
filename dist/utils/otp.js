export const generaeOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
export const getOtpExpireTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 2); // OTP expires in 2 minutes
    return now;
};
//# sourceMappingURL=otp.js.map