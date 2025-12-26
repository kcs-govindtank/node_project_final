import { z } from "zod";
// Base schema for common event fields
const baseEventSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    content: z.string().optional(),
    mediaType: z.enum(["image", "video", "audio", "text"]),
    file: z.union([z.string(), z.instanceof(File)]).optional(),
    location: z.string().min(1, "Location is required"),
    language: z.string().min(2, "Language must be at least 2 characters"),
    publishedDate: z.string().datetime().optional(),
    publishStatus: z.enum(["publish", "draft"]),
    categoryId: z.number().int().positive("Category ID must be a positive integer"),
    subcategoryId: z.number().int().positive("Subcategory ID must be a positive integer"),
    countryId: z.number().int().positive("Country ID must be a positive integer"),
    stateId: z.number().int().positive("State ID must be a positive integer"),
});
// Schema for adding an event
export const addEventSchema = baseEventSchema;
// Schema for editing an event (all fields optional)
export const editEventSchema = baseEventSchema.partial().extend({
    id: z.number().int().positive("Event ID must be a positive integer"),
});
// Schema for deleting an event
export const deleteEventSchema = z.object({
    id: z.number().int().positive("Event ID must be a positive integer"),
});
// Utility function to parse and validate
export const validateEvent = (schema, data) => {
    return schema.parse(data);
};
//# sourceMappingURL=eventValidation.js.map