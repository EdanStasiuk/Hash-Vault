import axios from 'axios';
import { getTokenBalance } from "../src/functions/functions";

jest.mock('axios');

describe("getTokenBalance function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return account balance in hbars if tokenId is "hedera-hashgraph"', async () => {
    const mockData = {
      balance: {
        balance: 1000000000, // 10 hbars in tinybars
      },
    };

    (axios.get as jest.Mock).mockResolvedValueOnce({ status: 200, data: mockData });

    const balance = await getTokenBalance("hedera-hashgraph", "accountId");

    expect(balance).toBe(10);
  });

  test("should return the balance of a specified token", async () => {
    const mockAccountResponse = {
      balance: {
        tokens: [{ token_id: "tokenId", balance: 1000000 }],
      },
    };
    const mockTokenResponse = {
      decimals: 6,
    };

    (axios.get as jest.Mock)
      .mockResolvedValueOnce({ status: 200, data: mockAccountResponse })
      .mockResolvedValueOnce({ status: 200, data: mockTokenResponse });

    const balance = await getTokenBalance("tokenId", "accountId");
    expect(balance).toBe(1); // 1000000 token units / 10^6 = 1 token unit
  });

  test("should return null if the account fetch fails", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ status: 500 });

    const balance = await getTokenBalance("hedera-hashgraph", "accountId");
    expect(balance).toBeNull();
  });

  test("should return null if the token fetch fails", async () => {
    const mockAccountResponse = {
      balance: {
        tokens: [{ token_id: "tokenId", balance: 1000000 }],
      },
    };

    (axios.get as jest.Mock)
      .mockResolvedValueOnce({ status: 200, data: mockAccountResponse })
      .mockResolvedValueOnce({ status: 500 });

    const balance = await getTokenBalance("tokenId", "accountId");
    expect(balance).toBeNull();
  });

  test("should return 0 if token is not found in the account balance", async () => {
    const mockAccountResponse = {
      balance: {
        tokens: [],
      },
    };
    const mockTokenResponse = {
      decimals: 6,
    };

    (axios.get as jest.Mock)
      .mockResolvedValueOnce({ status: 200, data: mockAccountResponse })
      .mockResolvedValueOnce({ status: 200, data: mockTokenResponse });

    const balance = await getTokenBalance("tokenId", "accountId");
    expect(balance).toBe(0);
  });
});
