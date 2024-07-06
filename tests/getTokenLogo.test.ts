import axios from 'axios';
import { getTokenLogo } from "../src/functions/functions";

jest.mock('axios');

describe("getTokenLogo function", () => {
  const network = "hedera";
  const address = "0.0.1234567";
  const mockData = {
    pic: "https://example.com/token.jpg",
  };
  const expectedURL = "https://example.com/token.jpg";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return the URL of the token's photo", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ status: 200, data: mockData });

    const result = await getTokenLogo(network, address);
    expect(result).toBe(expectedURL);
    expect(axios.get).toHaveBeenCalledWith(`/api/v2/tokens/${network}/${address}`);
  });

  test("should throw an error if HTTP response is not OK", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ status: 404 });

    await expect(getTokenLogo(network, address)).rejects.toThrow(
      "HTTP error! status: 404"
    );
  });

  test("should throw an error if fetch throws an error", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    await expect(getTokenLogo(network, address)).rejects.toThrow(
      "Network error"
    );
  });
});
