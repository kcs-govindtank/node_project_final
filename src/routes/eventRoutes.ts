import express from "express";
import EventController from "../controllers/eventController.js";
import eventMiddlewar from "../middlewares/eventMiddlewares.js";
import upload from "../middlewares/uploadFileMiddleware.js";

const eventRouter = express.Router();

// add event - protected route
eventRouter.post(
  "/addevent",
  eventMiddlewar.authenticate,
  upload.single("file"),
  EventController.addEvent
);

// edit event - protected route
eventRouter.put(
  "/editevent",
  eventMiddlewar.authenticate,
  upload.single("file"),
  EventController.editEvent
);

// delete event - protected route
eventRouter.delete(
  "/deleteevent/:id",
  eventMiddlewar.authenticate,
  EventController.deleteEvent
);

// view all events - public route (no auth)
eventRouter.get("/", EventController.viewAllEvents);

// view event by id - public route (no auth)
eventRouter.get("/:id", EventController.viewEventById);

export default eventRouter;
