import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { AddEventInput, EditEventInput, DeleteEventInput, ViewAllEventsInput } from "../validations/eventValidation.js";
import fs from 'fs';
import path from 'path';

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// Helper function to handle file upload and return a string path/url
// Replace this with your actual upload logic (e.g., AWS S3, Cloudinary)
const uploadFile = async (file: string | File | undefined): Promise<string | null | undefined> => {
  if (!file) return undefined;
  
  // If it's already a string (e.g., a URL), return it
  if (typeof file === 'string') return file;

  // If it's a File object, handle the upload
  // This is a placeholder for actual upload logic
  // For now, we'll just return the file name as a string
  // In a real app, you would save the file to disk or cloud storage
  return file.name; 
};

// Map incoming publishStatus values to Prisma enum values
const mapPublishStatus = (status?: string) => {
  if (!status) return undefined;
  const s = status.toLowerCase();
  if (s === "publish" || s === "published") return "PUBLISHED";
  if (s === "draft") return "DRAFT";
  return undefined;
};

class EventServices {
  static viewAllEvents = async (input: ViewAllEventsInput) => {
    const { search, filter, page, limit } = input;

    // Implement your search/filter logic here
    const events = await prisma.event.findMany({
      where: {
        ...(search ? {
          OR: [
            { title: { contains: search } },
            { description: { contains: search } },
            { content: { contains: search } }
          ]
        } : {}),
        // Add filter conditions if needed
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return events;
  };

  static viewEventById = async (id: number) => {
    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new Error("Event not found");
    }

    return event;
  };

  static addEvent = async (data: AddEventInput) => {
    // Handle file upload/conversion
    const fileString = await uploadFile(data.file);

    // Map publishStatus to Prisma enum values
    const publishStatus = mapPublishStatus(data.publishStatus);

    // Build the data object, omitting undefined values
    const eventData: any = {
      ...data,
      // Ensure date is properly converted if needed
      date: data.date ? new Date(data.date) : new Date(),
      publishDate: data.publishDate ? new Date(data.publishDate) : new Date(),

      // Convert undefined content to null to match Prisma schema
      content: data.content ?? null,
      // Ensure file is either a string or null, not undefined
      file: fileString ?? null,
      // ... other fields ...
    };

    // Only add publishStatus if it's defined
    if (publishStatus !== undefined) {
      eventData.publishStatus = publishStatus;
    }

    return await prisma.event.create({
      data: eventData
    });
  };

  static editEvent = async (input: EditEventInput) => {
    const { id, ...data } = input;

    // Handle file upload/conversion
    const fileString = await uploadFile(data.file);

    // Filter out undefined values to avoid type errors
    const eventData: any = {
      title: data.title,
      description: data.description,
      content: data.content,
      mediaType: data.mediaType,
      file: fileString,
      location: data.location,
      language: data.language,
      categoryId: data.categoryId,
      subcategoryId: data.subcategoryId,
      countryId: data.countryId,
      stateId: data.stateId,
    };

    // Only add publishDate if it's defined
    if (data.publishDate !== undefined) {
      eventData.publishDate = data.publishDate;
    }

    // Only add publishStatus if it's defined
    const publishStatus = mapPublishStatus(data.publishStatus);
    if (publishStatus !== undefined) {
      eventData.publishStatus = publishStatus;
    }

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: eventData,
    });

    return updatedEvent;
  };

  static deleteEvent = async (input: DeleteEventInput) => {
    const deletedEvent = await prisma.event.delete({
      where: { id: input.id },
    });

    return deletedEvent;
  };
}

export default EventServices;
