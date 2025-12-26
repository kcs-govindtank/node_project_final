export function assertExist(value, message = "Not found") {
    if (value === null || value === undefined) {
        const err = new Error(message);
        err.status = 404;
        throw err;
    }
}
//# sourceMappingURL=assertExist.js.map