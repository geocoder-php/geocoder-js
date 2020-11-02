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

// From https://github.com/sindresorhus/ip-regex
const ipv4RegExp =
  "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}";
export const isIpv4 = (ip: string): boolean =>
  new RegExp(`^${ipv4RegExp}$`).test(ip);

// From https://github.com/sindresorhus/ip-regex
const ipv6Seg = "[a-fA-F\\d]{1,4}";
const ipv6RegExp = `((?:${ipv6Seg}:){7}(?:${ipv6Seg}|:)|(?:${ipv6Seg}:){6}(?:${ipv4RegExp}|:${ipv6Seg}|:)|(?:${ipv6Seg}:){5}(?::${ipv4RegExp}|(:${ipv6Seg}){1,2}|:)|(?:${ipv6Seg}:){4}(?:(:${ipv6Seg}){0,1}:${ipv4RegExp}|(:${ipv6Seg}){1,3}|:)|(?:${ipv6Seg}:){3}(?:(:${ipv6Seg}){0,2}:${ipv4RegExp}|(:${ipv6Seg}){1,4}|:)|(?:${ipv6Seg}:){2}(?:(:${ipv6Seg}){0,3}:${ipv4RegExp}|(:${ipv6Seg}){1,5}|:)|(?:${ipv6Seg}:){1}(?:(:${ipv6Seg}){0,4}:${ipv4RegExp}|(:${ipv6Seg}){1,6}|:)|(?::((?::${ipv6Seg}){0,5}:${ipv4RegExp}|(?::${ipv6Seg}){1,7}|:)))(%[0-9a-zA-Z]{1,})?`;
export const isIpv6 = (ip: string): boolean =>
  new RegExp(`^${ipv6RegExp}$`).test(ip);

// eslint-disable-next-line @typescript-eslint/ban-types
export const getRequireFunc = (): Function =>
  // eslint-disable-next-line camelcase
  typeof __non_webpack_require__ === "function"
    ? // eslint-disable-next-line camelcase
      __non_webpack_require__
    : require;
