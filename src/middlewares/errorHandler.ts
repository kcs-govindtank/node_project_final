import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("[ERROR]", err);
  const status = err?.status || 500;
  const message = err?.message || "Internal server error";
  res.status(status).json({ success: false, message });
};

export default errorHandler;
