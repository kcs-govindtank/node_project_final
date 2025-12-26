import type { Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../utils/type.js";
declare class eventMiddlewares {
    static authenticate: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
}
export default eventMiddlewares;
//# sourceMappingURL=eventMiddlewares.d.ts.map