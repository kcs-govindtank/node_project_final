var _a;
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, PublishStates } from "../generated/prisma/client.js";
import { assertExist } from "../utils/assertExist.js";
import { validateEvent, addEventSchema, editEventSchema, deleteEventSchema } from "../validations/eventValidation.js";
const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
class EventServices {
}
_a = EventServices;
EventServices.addEvent = async (payload) => {
    // ✅ Validate input using Zod
    const validatedData = validateEvent(addEventSchema, payload);
    // 🔹 Validate foreign keys exist (only include defined keys)
    const fkToValidateAdd = {};
    if (validatedData.categoryId !== undefined)
        fkToValidateAdd.categoryId = validatedData.categoryId;
    if (validatedData.subcategoryId !== undefined)
        fkToValidateAdd.subcategoryId = validatedData.subcategoryId;
    if (validatedData.countryId !== undefined)
        fkToValidateAdd.countryId = validatedData.countryId;
    if (validatedData.stateId !== undefined)
        fkToValidateAdd.stateId = validatedData.stateId;
    await _a.validateForeignKeys(fkToValidateAdd);
    // Build data object
    const data = {
        title: validatedData.title,
        description: validatedData.description,
        content: validatedData.content,
        mediaType: validatedData.mediaType,
        file: validatedData.file,
        location: validatedData.location,
        language: validatedData.language,
        publishStates: validatedData.publishStatus === "publish" ? PublishStates.PUBLISHED : PublishStates.DRAFT,
        categoryId: validatedData.categoryId,
        subcategoryId: validatedData.subcategoryId,
        countryId: validatedData.countryId,
        stateId: validatedData.stateId,
    };
    if (validatedData.publishedDate) {
        data.publishDate = new Date(validatedData.publishedDate);
        data.date = new Date(validatedData.publishedDate);
    }
    const event = await prisma.event.create({ data });
    return event;
};
EventServices.editEvent = async (payload) => {
    // ✅ Validate input using Zod
    const validatedData = validateEvent(editEventSchema, payload);
    // Validate event exists
    const existing = await prisma.event.findUnique({ where: { id: validatedData.id } });
    assertExist(existing, "Invalid event id");
    // 🔹 Validate foreign keys if provided (only include defined keys)
    const fkToValidateEdit = {};
    if (validatedData.categoryId !== undefined)
        fkToValidateEdit.categoryId = validatedData.categoryId;
    if (validatedData.subcategoryId !== undefined)
        fkToValidateEdit.subcategoryId = validatedData.subcategoryId;
    if (validatedData.countryId !== undefined)
        fkToValidateEdit.countryId = validatedData.countryId;
    if (validatedData.stateId !== undefined)
        fkToValidateEdit.stateId = validatedData.stateId;
    await _a.validateForeignKeys(fkToValidateEdit);
    // Build update data (only include fields that were provided)
    const updateData = {};
    if (validatedData.title)
        updateData.title = validatedData.title;
    if (validatedData.description)
        updateData.description = validatedData.description;
    if (validatedData.content)
        updateData.content = validatedData.content;
    if (validatedData.mediaType)
        updateData.mediaType = validatedData.mediaType;
    if (validatedData.file)
        updateData.file = validatedData.file;
    if (validatedData.location)
        updateData.location = validatedData.location;
    if (validatedData.language)
        updateData.language = validatedData.language;
    if (validatedData.categoryId)
        updateData.categoryId = validatedData.categoryId;
    if (validatedData.subcategoryId)
        updateData.subcategoryId = validatedData.subcategoryId;
    if (validatedData.countryId)
        updateData.countryId = validatedData.countryId;
    if (validatedData.stateId)
        updateData.stateId = validatedData.stateId;
    if (validatedData.publishedDate) {
        updateData.publishDate = new Date(validatedData.publishedDate);
        updateData.date = new Date(validatedData.publishedDate);
    }
    if (validatedData.publishStatus) {
        updateData.publishStates = validatedData.publishStatus === "publish" ? PublishStates.PUBLISHED : PublishStates.DRAFT;
    }
    const updated = await prisma.event.update({
        where: { id: validatedData.id },
        data: updateData,
    });
    return updated;
};
EventServices.deleteEvent = async (payload) => {
    // ✅ Validate input using Zod
    const validatedData = validateEvent(deleteEventSchema, payload);
    const existing = await prisma.event.findUnique({ where: { id: validatedData.id } });
    assertExist(existing, "Invalid event id");
    const deleted = await prisma.event.delete({ where: { id: validatedData.id } });
    return deleted;
};
// Helper method to validate foreign keys
EventServices.validateForeignKeys = async ({ categoryId, subcategoryId, countryId, stateId, }) => {
    if (categoryId) {
        const categoryExists = await prisma.category.findUnique({ where: { id: categoryId } });
        assertExist(categoryExists, "Invalid categoryId");
    }
    if (subcategoryId) {
        const subcategoryExists = await prisma.subcategory.findUnique({ where: { id: subcategoryId } });
        assertExist(subcategoryExists, "Invalid subcategoryId");
    }
    if (countryId) {
        const countryExists = await prisma.country.findUnique({ where: { id: countryId } });
        assertExist(countryExists, "Invalid countryId");
    }
    if (stateId) {
        const stateExists = await prisma.state.findUnique({ where: { id: stateId } });
        assertExist(stateExists, "Invalid stateId");
    }
};
export default EventServices;
//# sourceMappingURL=eventServices.js.map