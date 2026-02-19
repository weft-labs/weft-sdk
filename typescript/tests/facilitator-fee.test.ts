import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { invalidateFeeCache, getFeeInfo } from "../src/facilitator/fee";

// Mock the client module
vi.mock("../src/facilitator/client", () => ({
  createFacilitatorClient: vi.fn(),
  resolveUrl: vi.fn(() => "https://x402.weft.network"),
  validateUrl: vi.fn(),
  X402_FACILITATOR_URL: "https://x402.weft.network",
  X402_FACILITATOR_URL_ENV: "X402_FACILITATOR_URL",
}));

import { createFacilitatorClient } from "../src/facilitator/client";

const mockGetSupported = vi.fn();
const mockClient = { getSupported: mockGetSupported };

describe("getFeeInfo", () => {
  beforeEach(() => {
    invalidateFeeCache();
    vi.mocked(createFacilitatorClient).mockReturnValue(mockClient as any);
    mockGetSupported.mockReset();
  });

  it("fetches fee info from /supported", async () => {
    mockGetSupported.mockResolvedValue({
      fee: { amount: "0.001", asset: "USDC", network: "base-sepolia" },
    });

    const fee = await getFeeInfo();

    expect(fee).toEqual({
      amount: "0.001",
      asset: "USDC",
      network: "base-sepolia",
    });
    expect(mockGetSupported).toHaveBeenCalledOnce();
  });

  it("caches fee info on subsequent calls", async () => {
    mockGetSupported.mockResolvedValue({
      fee: { amount: "0.001", asset: "USDC", network: "base-sepolia" },
    });

    const first = await getFeeInfo();
    const second = await getFeeInfo();

    expect(first).toEqual(second);
    expect(mockGetSupported).toHaveBeenCalledOnce();
  });

  it("refetches after cache invalidation", async () => {
    mockGetSupported.mockResolvedValue({
      fee: { amount: "0.001", asset: "USDC", network: "base-sepolia" },
    });

    await getFeeInfo();
    invalidateFeeCache();
    await getFeeInfo();

    expect(mockGetSupported).toHaveBeenCalledTimes(2);
  });

  it("throws when fee not found in response", async () => {
    mockGetSupported.mockResolvedValue({});

    await expect(getFeeInfo()).rejects.toThrow(
      "Fee information not found in /supported response"
    );
  });

  it("throws when fee amount is not a string", async () => {
    mockGetSupported.mockResolvedValue({
      fee: { amount: 0.001, asset: "USDC", network: "base-sepolia" },
    });

    await expect(getFeeInfo()).rejects.toThrow("amount must be a string");
  });

  it("throws when fee asset is not a string", async () => {
    mockGetSupported.mockResolvedValue({
      fee: { amount: "0.001", asset: 123, network: "base-sepolia" },
    });

    await expect(getFeeInfo()).rejects.toThrow("asset must be a string");
  });

  it("throws when fee network is not a string", async () => {
    mockGetSupported.mockResolvedValue({
      fee: { amount: "0.001", asset: "USDC", network: null },
    });

    await expect(getFeeInfo()).rejects.toThrow("network must be a string");
  });

  it("respects custom TTL", async () => {
    mockGetSupported.mockResolvedValue({
      fee: { amount: "0.001", asset: "USDC", network: "base-sepolia" },
    });

    // Use a very short TTL
    await getFeeInfo(undefined, { ttl: 1 });

    // Wait for cache to expire
    await new Promise((resolve) => setTimeout(resolve, 10));

    await getFeeInfo(undefined, { ttl: 1 });

    expect(mockGetSupported).toHaveBeenCalledTimes(2);
  });
});
