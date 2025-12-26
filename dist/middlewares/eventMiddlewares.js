import { verifyToken } from "../utils/jwt.js";
class eventMiddlewares {
}
eventMiddlewares.authenticate = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer", "").trim();
    if (!token) {
        return res.status(401).json({ message: "Authorization header missing" });
    }
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
export default eventMiddlewares;
//# sourceMappingURL=eventMiddlewares.js.map