import { z } from "zod";
export declare const addEventSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    content: z.ZodOptional<z.ZodString>;
    mediaType: z.ZodEnum<{
        image: "image";
        video: "video";
        audio: "audio";
        text: "text";
    }>;
    file: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodCustom<File, File>]>>;
    location: z.ZodString;
    language: z.ZodString;
    publishedDate: z.ZodOptional<z.ZodString>;
    publishStatus: z.ZodEnum<{
        publish: "publish";
        draft: "draft";
    }>;
    categoryId: z.ZodNumber;
    subcategoryId: z.ZodNumber;
    countryId: z.ZodNumber;
    stateId: z.ZodNumber;
}, z.core.$strip>;
export declare const editEventSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    mediaType: z.ZodOptional<z.ZodEnum<{
        image: "image";
        video: "video";
        audio: "audio";
        text: "text";
    }>>;
    file: z.ZodOptional<z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodCustom<File, File>]>>>;
    location: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    publishedDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    publishStatus: z.ZodOptional<z.ZodEnum<{
        publish: "publish";
        draft: "draft";
    }>>;
    categoryId: z.ZodOptional<z.ZodNumber>;
    subcategoryId: z.ZodOptional<z.ZodNumber>;
    countryId: z.ZodOptional<z.ZodNumber>;
    stateId: z.ZodOptional<z.ZodNumber>;
    id: z.ZodNumber;
}, z.core.$strip>;
export declare const deleteEventSchema: z.ZodObject<{
    id: z.ZodNumber;
}, z.core.$strip>;
export declare const validateEvent: <T>(schema: z.ZodSchema<T>, data: unknown) => T;
//# sourceMappingURL=eventValidation.d.ts.map