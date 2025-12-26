import { type Request, type Response } from "express";  // ✅ Added 'type' keyword
import EventServices from "../services/eventServices.js";

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
  addEvent: async (req: Request, res: Response) => {
    try {
      const payload = parseNumericFields(req);
      const event = await EventServices.addEvent(payload);
      res.status(201).json({ success: true, data: event });
    } catch (error) {
      res.status(400).json({ success: false, message: String(error) });
    }
  },

  editEvent: async (req: Request, res: Response) => {
    try {
      const payload = parseNumericFields(req);
      const updated = await EventServices.editEvent(payload);
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
      const deleted = await EventServices.deleteEvent({ id });
      res.json({ success: true, data: deleted });
    } catch (error) {
      res.status(400).json({ success: false, message: String(error) });
    }
  },
};
