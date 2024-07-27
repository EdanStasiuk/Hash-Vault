import axios from 'axios';
import { isNft } from "../src/functions/functions";

jest.mock('axios');

describe("isNft function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return true if the token is an NFT for the given account", async () => {
    const mockData = {
      nfts: [{ token_id: "tokenId" }],
    };

    (axios.get as jest.Mock).mockResolvedValueOnce({ status: 200, data: mockData });

    const result = await isNft("accountId", "tokenId");
    expect(result).toBe(true);
  });

  test("should return false if the token is not an NFT for the given account", async () => {
    const mockData = {
      nfts: [{ token_id: "otherTokenId" }],
    };

    (axios.get as jest.Mock).mockResolvedValueOnce({ status: 200, data: mockData });

    const result = await isNft("accountId", "tokenId");
    expect(result).toBe(false);
  });

  test("should return false if there are no NFTs for the given account", async () => {
    const mockData = {
      nfts: [],
    };

    (axios.get as jest.Mock).mockResolvedValueOnce({ status: 200, data: mockData });

    const result = await isNft("accountId", "tokenId");
    expect(result).toBe(false);
  });

  test("should return false if the fetch request fails", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ status: 500 });

    const result = await isNft("accountId", "tokenId");
    expect(result).toBe(false);
  });

  test("should return false if an error is thrown during fetch", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    const result = await isNft("accountId", "tokenId");
    expect(result).toBe(false);
  });
});
