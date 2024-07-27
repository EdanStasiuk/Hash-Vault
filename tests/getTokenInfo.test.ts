import axios from 'axios';
import { getTokenInfo } from "../src/functions/functions";

jest.mock('axios');

describe("getTokenInfo function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return token information if fetch is successful", async () => {
    const mockData = {
      name: "Token Name",
      symbol: "TOK",
      decimals: "18",
    };

    (axios.get as jest.Mock).mockResolvedValueOnce({ status: 200, data: mockData });

    const result = await getTokenInfo("tokenId");
    expect(result).toEqual({
      name: "Token Name",
      symbol: "TOK",
      decimals: "18",
    });
  });

  test("should return null if token data is invalid", async () => {
    const mockData = {
      name: null,
      symbol: "TOK",
      decimals: "18",
    };

    (axios.get as jest.Mock).mockResolvedValueOnce({ status: 200, data: mockData });

    const result = await getTokenInfo("tokenId");
    expect(result).toBeNull();
  });

  test("should return null if fetch request fails", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ status: 500 });

    const result = await getTokenInfo("tokenId");
    expect(result).toBeNull();
  });

  test("should return null if an error is thrown during fetch", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    const result = await getTokenInfo("tokenId");
    expect(result).toBeNull();
  });
});
