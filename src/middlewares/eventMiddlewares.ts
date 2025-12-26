import type { Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../utils/type.js";
import { verifyToken } from "../utils/jwt.js";

class eventMiddlewares {
  static authenticate = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.header("Authorization")?.replace("Bearer", "").trim();
    if (!token) {
      return res.status(401).json({ message: "Authorization header missing" });
    }
    try {
      const decoded = verifyToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}

export default eventMiddlewares;
