const errorHandler = (err, _req, res, _next) => {
    console.error("[ERROR]", err);
    const status = err?.status || 500;
    const message = err?.message || "Internal server error";
    res.status(status).json({ success: false, message });
};
export default errorHandler;
//# sourceMappingURL=errorHandler.js.map