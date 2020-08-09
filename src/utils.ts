export const isBrowser = (): boolean => typeof window !== "undefined";

export const filterUndefinedObjectValues = <V>(
  object: Record<string, V | undefined>
): Record<string, V> =>
  Object.keys(object).reduce((acc: Record<string, V>, key) => {
    const filtered = acc;
    const value = object[key];
    if (value !== undefined) {
      filtered[key] = value;
    }
    return filtered;
  }, {});

/**
 * Decode from URL-safe base64 to true base64.
 */
export const decodeUrlSafeBase64 = (safe: string): string =>
  safe.replace(/-/g, "+").replace(/_/g, "/");

/**
 * Encode from true base64 to URL-safe base64.
 */
export const encodeUrlSafeBase64 = (base64: string): string =>
  base64.replace(/\+/g, "-").replace(/\//g, "_");

export const decodeBase64 = (base64: string): string => {
  if (isBrowser()) {
    throw new Error("decodeBase64 can only be used in a Node environment.");
  }

  return Buffer.from(base64, "base64").toString();
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const getRequireFunc = (): Function =>
  // eslint-disable-next-line camelcase
  typeof __non_webpack_require__ === "function"
    ? // eslint-disable-next-line camelcase
      __non_webpack_require__
    : require;
