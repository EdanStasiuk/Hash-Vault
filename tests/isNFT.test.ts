import { isNFT } from "../src/functions";

describe("isNFT function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return true if the token is an NFT for the given account", async () => {
    const mockData = {
      nfts: [{ token_id: "tokenId" }],
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const result = await isNFT("accountId", "tokenId");
    expect(result).toBe(true);
  });

  test("should return false if the token is not an NFT for the given account", async () => {
    const mockData = {
      nfts: [{ token_id: "otherTokenId" }],
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const result = await isNFT("accountId", "tokenId");
    expect(result).toBe(false);
  });

  test("should return false if there are no NFTs for the given account", async () => {
    const mockData = {
      nfts: [],
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const result = await isNFT("accountId", "tokenId");
    expect(result).toBe(false);
  });

  test("should return false if the fetch request fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    const result = await isNFT("accountId", "tokenId");
    expect(result).toBe(false);
  });

  test("should return false if an error is thrown during fetch", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

    const result = await isNFT("accountId", "tokenId");
    expect(result).toBe(false);
  });
});
