import express from "express";
import cors from "cors";
import "dotenv/config";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// CORS middleware
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  console.log(
    `[REQ] ${new Date().toISOString()} ${req.method} ${req.originalUrl} body:`,
    req.body
  );
  next();
});

// Health check endpoint
app.get("/health", (_req, res) =>
  res.json({ ok: true, time: new Date().toISOString() })
);

// Serve uploaded files statically
app.use("/uploads/events", express.static("uploads/events"));

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;