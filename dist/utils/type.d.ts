import type { JwtPayload } from "jsonwebtoken";
import type { Request } from "express";
export interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload;
}
//# sourceMappingURL=type.d.ts.map