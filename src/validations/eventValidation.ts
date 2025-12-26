import { z } from "zod";

// Base schema for common event fields
const baseEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().optional(),
  mediaType: z.enum(["image", "video", "audio", "text"], {
    error: "Media type must be one of: image, video, audio, text"
  }),
  file: z.union([z.string(), z.instanceof(File)]).optional(),
  location: z.string().min(1, "Location is required"),
  language: z.string().min(2, "Language must be at least 2 characters"),
  publishDate: z.string().datetime({
    message: "Published date must be a valid ISO datetime (e.g., 2025-12-25T00:00:00Z)"
  }).or(z.date().transform(d => d.toISOString())),
  publishStatus: z.enum(["publish", "draft", "PUBLISHED", "DRAFT"], {
    error: "Publish status must be one of: publish, draft, PUBLISHED, DRAFT"
  }),
  categoryId: z.number().int().positive("Category ID must be a positive integer"),
  subcategoryId: z.number().int().positive("Subcategory ID must be a positive integer"),
  countryId: z.number().int().positive("Country ID must be a positive integer"),
  stateId: z.number().int().positive("State ID must be a positive integer"),
  date: z.string().datetime({
    message: "Date must be a valid ISO datetime (e.g., 2025-12-25T00:00:00Z)"
  }).or(z.date().transform(d => d.toISOString())),
});

// Schema for adding an event
export const addEventSchema = baseEventSchema;
export type AddEventInput = z.infer<typeof addEventSchema>;

// Schema for editing an event (all fields optional)
export const editEventSchema = baseEventSchema.partial().extend({
  id: z.number().int().positive("Event ID must be a positive integer"),
});
export type EditEventInput = z.infer<typeof editEventSchema>;

// Schema for deleting an event
export const deleteEventSchema = z.object({
  id: z.number().int().positive("Event ID must be a positive integer"),
});
export type DeleteEventInput = z.infer<typeof deleteEventSchema>;

// Schema for viewing all events
export const viewAllEventsSchema = z.object({
  search: z.string().optional(),
  filter: z.string().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(10),
});
export type ViewAllEventsInput = z.infer<typeof viewAllEventsSchema>;

// Utility function to parse and validate
export const validateEvent = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  return schema.parse(data);
};