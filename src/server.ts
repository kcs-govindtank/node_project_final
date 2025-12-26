import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import "dotenv/config";
import eventRoutes from "./routes/eventRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple request logger to help debug why routes (like /auth/login) don't respond
app.use((req, res, next) => {
  console.log(
    `[REQ] ${new Date().toISOString()} ${req.method} ${req.originalUrl} body:`,
    req.body
  );
  next();
});

// health check
app.get("/health", (_req, res) =>
  res.json({ ok: true, time: new Date().toISOString() })
);

// Mount the routers
app.use("/api/events", eventRoutes);
app.use("/api/user", authRoutes);

// Serve uploaded files statically
app.use("/uploads/events", express.static("uploads/events"));

// JSON error handler (should be last middleware)
app.use((err: any, _req: express.Request, res: express.Response, _next: any) => {
  console.error("[ERROR]", err);
  const status = err?.status || 500;
  const message = err?.message || "Internal server error";
  res.status(status).json({ success: false, message });
});

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "localhost";

const server = app.listen(PORT, () => {
  // minimal startup log
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});

// graceful shutdown hooks
process.on("unhandledRejection", (reason) => {
  // eslint-disable-next-line no-console
  console.error("Unhandled Rejection:", reason);
  server.close(() => process.exit(1));
});
process.on("uncaughtException", (err) => {
  // eslint-disable-next-line no-console
  console.error("Uncaught Exception:", err);
  server.close(() => process.exit(1));
});
