import express from "express";
const router = express.Router();
// Health check endpoint
router.get("/health", (req, res) => {
    res.json({ ok: true, time: new Date().toISOString() });
});
// Login endpoint
router.post("/login", (req, res) => {
    try {
        const { email, password } = req.body;
        // Basic validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }
        // Mock authentication (replace with actual auth logic)
        if (email === "test@example.com" && password === "password123") {
            return res.json({
                success: true,
                message: "Login successful",
                user: {
                    id: 1,
                    email: email,
                    name: "Test User"
                }
            });
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});
// Register endpoint
router.post("/register", (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and password are required"
            });
        }
        // Mock registration (replace with actual registration logic)
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: 1,
                name: name,
                email: email
            }
        });
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});
export default router;
//# sourceMappingURL=authRoutes.js.map