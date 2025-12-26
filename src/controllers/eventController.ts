import { type Request, type Response } from "express";
import EventServices from "../services/eventServices.js";
import {
  addEventSchema,
  editEventSchema,
  deleteEventSchema,
  viewAllEventsSchema
} from "../validations/eventValidation.js";

// Helper to parse numeric fields
const parseNumericFields = (req: Request) => {
  const body = { ...req.body } as Record<string, unknown>;

  // Parse numeric fields from form-data (which are strings)
  const toNumberIfPresent = (val: unknown) => {
    if (val === undefined || val === null || val === "") return undefined;
    const n = Number(val);
    return Number.isNaN(n) ? undefined : n;
  };

  if (body.id !== undefined) body.id = toNumberIfPresent(body.id);
  if (body.categoryId !== undefined) body.categoryId = toNumberIfPresent(body.categoryId);
  if (body.subcategoryId !== undefined) body.subcategoryId = toNumberIfPresent(body.subcategoryId);
  if (body.countryId !== undefined) body.countryId = toNumberIfPresent(body.countryId);
  if (body.stateId !== undefined) body.stateId = toNumberIfPresent(body.stateId);

  // Handle file upload
  if (req.file?.path) {
    body.file = req.file.path;
  }

  return body;
};

export default {
  viewAllEvents: async (req: Request, res: Response) => {
    try {
      const validation = viewAllEventsSchema.safeParse({
        search: req.query.search,
        filter: req.query.filter,
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 10,
      });

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validation.error
        });
      }

      const events = await EventServices.viewAllEvents(validation.data);
      res.json({ success: true, data: events });
    } catch (error) {
      res.status(500).json({ success: false, message: String(error) });
    }
  },

  viewEventById: async (req: Request, res: Response) => {
    try {
      const idParam = req.params.id;
      if (!idParam) {
        return res.status(400).json({ success: false, message: "Missing id parameter" });
      }

      const id = Number(idParam);
      if (Number.isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid id parameter" });
      }

      const event = await EventServices.viewEventById(id);
      res.json({ success: true, data: event });
    } catch (error) {
      res.status(500).json({ success: false, message: String(error) });
    }
  },

  addEvent: async (req: Request, res: Response) => {
    try {
      const payload = parseNumericFields(req);

      // Ensure date is properly formatted
      if (payload.date) {
        if (payload.date instanceof Date) {
          payload.date = payload.date.toISOString();
        }
        else if (typeof payload.date === 'string') {
          const parsedDate = new Date(payload.date);
          if (!isNaN(parsedDate.getTime())) {
            payload.date = parsedDate.toISOString();
          }
        }
      }

      // Ensure publishDate is properly formatted (changed from publishedDate)
      if (payload.publishDate) {
        if (payload.publishDate instanceof Date) {
          payload.publishDate = payload.publishDate.toISOString();
        }
        else if (typeof payload.publishDate === 'string') {
          const parsedDate = new Date(payload.publishDate);
          if (!isNaN(parsedDate.getTime())) {
            payload.publishDate = parsedDate.toISOString();
          }
        }
      }

      const validation = addEventSchema.safeParse(payload);
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validation.error.format()
        });
      }

      const event = await EventServices.addEvent(validation.data);
      res.status(201).json({ success: true, data: event });
    } catch (error) {
      res.status(400).json({ success: false, message: String(error) });
    }
  },

  editEvent: async (req: Request, res: Response) => {
    try {
      const payload = parseNumericFields(req);

      const validation = editEventSchema.safeParse(payload);
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validation.error
        });
      }

      const updated = await EventServices.editEvent(validation.data);
      res.json({ success: true, data: updated });
    } catch (error) {
      res.status(400).json({ success: false, message: String(error) });
    }
  },

  deleteEvent: async (req: Request, res: Response) => {
    try {
      const idParam = req.params.id;
      if (!idParam) {
        return res.status(400).json({ success: false, message: "Missing id parameter" });
      }

      const id = Number(idParam);
      if (Number.isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid id parameter" });
      }

      const validation = deleteEventSchema.safeParse({ id });
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validation.error
        });
      }

      const deleted = await EventServices.deleteEvent(validation.data);
      res.json({ success: true, message: "Event deleted successfully", data: deleted });
    } catch (error) {
      res.status(400).json({ success: false, message: String(error) });
    }
  },
};
