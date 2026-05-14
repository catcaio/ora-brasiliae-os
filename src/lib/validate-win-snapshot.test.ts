import { describe, it, expect } from "vitest";
import { validateWinSnapshot } from "./validate-win-snapshot";
import { WinDailySnapshot } from "./market-data-types";

describe("validateWinSnapshot", () => {
  const validSnapshot: Partial<WinDailySnapshot> = {
    date: "2026-05-13",
    asset: "WIN",
    contract: "WINM26",
    opening: 120000,
    high: 121000,
    low: 119000,
    close: 120500,
    previousSettlement: 119500,
    volume: 1000000,
    vwap: 120200
  };

  it("should validate a complete and correct snapshot", () => {
    const result = validateWinSnapshot(validSnapshot);
    expect(result.isValid).toBe(true);
    expect(result.quality).toBe("complete");
    expect(result.errors).toHaveLength(0);
  });

  it("should fail if high is lower than low", () => {
    const invalid = { ...validSnapshot, high: 110000, low: 120000 };
    const result = validateWinSnapshot(invalid);
    expect(result.isValid).toBe(false); 
    expect(result.quality).toBe("insufficient");
    expect(result.errors).toContain("High (110000) cannot be lower than Low (120000).");
  });

  it("should detect missing critical fields", () => {
    const missingCritical = { ...validSnapshot, opening: null };
    const result = validateWinSnapshot(missingCritical);
    expect(result.quality).toBe("insufficient");
    expect(result.missingFields).toContain("opening");
  });

  it("should mark as partial if only non-critical fields are missing", () => {
    const partial = { ...validSnapshot, vwap: null };
    const result = validateWinSnapshot(partial);
    expect(result.quality).toBe("partial");
    expect(result.missingFields).toContain("vwap");
  });
});
