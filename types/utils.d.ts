export declare const isBrowser: () => boolean;
export declare const filterUndefinedObjectValues: <V>(object: Record<string, V | undefined>) => Record<string, V>;
/**
 * Decode from URL-safe base64 to true base64.
 */
export declare const decodeUrlSafeBase64: (safe: string) => string;
/**
 * Encode from true base64 to URL-safe base64.
 */
export declare const encodeUrlSafeBase64: (base64: string) => string;
export declare const decodeBase64: (base64: string) => string;
export declare const getRequireFunc: () => Function;
//# sourceMappingURL=utils.d.ts.map