import express from "express";
import EventController from "../controllers/eventController.js";
import eventMiddlewar from "../middlewares/eventMiddlewares.js";
import upload from "../middlewares/uploadFileMiddleware.js";

const eventRouter = express.Router();


eventRouter.post(
  "/addevent",
  eventMiddlewar.authenticate,
  upload.single("file"),
  EventController.addEvent
);

eventRouter.put(
  "/editevent",
  eventMiddlewar.authenticate,
  upload.single("file"),
  EventController.editEvent
);

// delete via param for clarity
eventRouter.delete(
  "/deleteevent/:id",
  eventMiddlewar.authenticate,
  EventController.deleteEvent
);

export default eventRouter;
