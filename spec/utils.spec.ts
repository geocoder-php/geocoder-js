import {
  filterUndefinedObjectValues,
  decodeUrlSafeBase64,
  encodeUrlSafeBase64,
  decodeBase64,
  isIpv4,
  isIpv6,
} from "utils";

describe("Utilities", () => {
  it("can filter undefined object values", () => {
    const object = {
      string: "string",
      undefined,
      boolean: true,
    };

    expect(filterUndefinedObjectValues(object)).toEqual({
      string: "string",
      boolean: true,
    });
  });

  const encodedBase64 =
    "RW5jb2RlZCBzdHJpbmcgd2l0aCBub24tc2FmZSBjaGFyYWN0ZXJzOiA/Lg==";
  const urlSafeBase64 =
    "RW5jb2RlZCBzdHJpbmcgd2l0aCBub24tc2FmZSBjaGFyYWN0ZXJzOiA_Lg==";

  it("can decode URL-safe base64", () => {
    expect(decodeUrlSafeBase64(urlSafeBase64)).toEqual(encodedBase64);
  });

  it("can encode URL-safe base64", () => {
    expect(encodeUrlSafeBase64(encodedBase64)).toEqual(urlSafeBase64);
  });

  it("can decode base64", () => {
    expect(decodeBase64(encodedBase64)).toEqual(
      "Encoded string with non-safe characters: ?."
    );
  });

  it("can test IPV4", () => {
    expect(isIpv4("190.226.155.134")).toBeTrue();
    expect(isIpv4("1aa3:9379:0fcb:0044:f09a:ca53:baf4:0472")).toBeFalse();
  });

  it("can test IPV6", () => {
    expect(isIpv6("1aa3:9379:0fcb:0044:f09a:ca53:baf4:0472")).toBeTrue();
    expect(isIpv6("190.226.155.134")).toBeFalse();
  });
});
