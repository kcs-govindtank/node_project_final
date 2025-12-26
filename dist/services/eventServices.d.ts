declare class EventServices {
    static addEvent: (payload: any) => Promise<runtime.Types.Result.GetResult<import("../generated/prisma/models.js").$EventPayload<ExtArgs>, T, "create", GlobalOmitOptions>>;
    static editEvent: (payload: any) => Promise<runtime.Types.Result.GetResult<import("../generated/prisma/models.js").$EventPayload<ExtArgs>, T, "update", GlobalOmitOptions>>;
    static deleteEvent: (payload: any) => Promise<runtime.Types.Result.GetResult<import("../generated/prisma/models.js").$EventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>>;
    private static validateForeignKeys;
}
export default EventServices;
//# sourceMappingURL=eventServices.d.ts.map