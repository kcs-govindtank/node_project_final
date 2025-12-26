import express from "express";
import EventController from "../controllers/eventController";
import eventMiddlewar from "../middlewares/eventMiddlewares";
import upload from "../middlewares/uploadFileMiddleware";
const router = express.Router();
// Get all events
router.get("/", (req, res) => {
    try {
        // Mock events data
        const events = [
            {
                id: 1,
                title: "Tech Conference 2024",
                description: "Annual technology conference",
                date: "2024-12-15",
                location: "Convention Center"
            },
            {
                id: 2,
                title: "Workshop: Node.js Best Practices",
                description: "Learn best practices for Node.js development",
                date: "2024-12-20",
                location: "Online"
            }
        ];
        res.json({
            success: true,
            data: events
        });
    }
    catch (error) {
        console.error("Get events error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});
// Get single event by ID
router.get("/:id", (req, res) => {
    try {
        const { id } = req.params;
        const eventId = parseInt(id);
        if (isNaN(eventId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid event ID"
            });
        }
        // Mock event data
        const event = {
            id: eventId,
            title: "Tech Conference 2024",
            description: "Annual technology conference",
            date: "2024-12-15",
            location: "Convention Center",
            attendees: 500
        };
        res.json({
            success: true,
            data: event
        });
    }
    catch (error) {
        console.error("Get event error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});
// Create new event
router.post("/", (req, res) => {
    try {
        const { title, description, date, location } = req.body;
        // Basic validation
        if (!title || !description || !date || !location) {
            return res.status(400).json({
                success: false,
                message: "Title, description, date, and location are required"
            });
        }
        // Mock event creation
        const newEvent = {
            id: Math.floor(Math.random() * 1000) + 1,
            title,
            description,
            date,
            location,
            createdAt: new Date().toISOString()
        };
        res.status(201).json({
            success: true,
            message: "Event created successfully",
            data: newEvent
        });
    }
    catch (error) {
        console.error("Create event error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});
router.post("/addevent", eventMiddlewar.authenticate, upload.single("file"), EventController.addEvent);
router.put("/editevent", eventMiddlewar.authenticate, upload.single("file"), EventController.editEvent);
// delete via param for clarity
router.delete("/deleteevent/:id", eventMiddlewar.authenticate, EventController.deleteEvent);
export default router;
//# sourceMappingURL=eventRoutes.js.map