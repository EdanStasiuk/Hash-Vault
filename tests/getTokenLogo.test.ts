import { getTokenLogo } from "../src/functions/functions";

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
    global.fetch = jest.fn().mockImplementation((url) => {
      if (url.includes(`/api/v2/tokens/${network}/${address}`)) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockData),
        });
      }
      return Promise.reject(new Error("Unknown URL"));
    });

    const result = await getTokenLogo(network, address);
    expect(result).toBe(expectedURL);
    expect(fetch).toHaveBeenCalledWith(`/api/v2/tokens/${network}/${address}`);
  });

  test("should throw an error if HTTP response is not OK", async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      })
    );

    await expect(getTokenLogo(network, address)).rejects.toThrow(
      "HTTP error! status: 404"
    );
  });

  test("should throw an error if fetch throws an error", async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.reject(new Error("Network error")));

    await expect(getTokenLogo(network, address)).rejects.toThrow(
      "Network error"
    );
  });
});
