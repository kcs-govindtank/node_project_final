import type { Request, Response } from "express";
declare class AuthController {
    static register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    static login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    static verifyOtp: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
}
export default AuthController;
//# sourceMappingURL=authController.d.ts.map