export function assertExist<T>(value: T | null | undefined, message = "Not found"): asserts value {
  if (value === null || value === undefined) {
    const err = new Error(message);
    (err as any).status = 404;
    throw err;
  }
}
