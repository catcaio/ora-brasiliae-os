import { WinDailySnapshot, SnapshotValidationResult, SnapshotQuality } from "./market-data-types";

export function validateWinSnapshot(snapshot: Partial<WinDailySnapshot>): SnapshotValidationResult {
  const errors: string[] = [];
  const missingFields: string[] = [];
  
  // Mandatory fields
  if (!snapshot.date) {
    errors.push("Field 'date' is mandatory.");
  }
  if (!snapshot.asset) {
    errors.push("Field 'asset' is mandatory.");
  } else if (snapshot.asset !== "WIN") {
    errors.push("Field 'asset' must be 'WIN'.");
  }
  if (!snapshot.contract) {
    errors.push("Field 'contract' is mandatory.");
  }

  // Logical validations
  if (snapshot.high !== null && snapshot.low !== null && snapshot.high !== undefined && snapshot.low !== undefined) {
    if (snapshot.high < snapshot.low) {
      errors.push(`High (${snapshot.high}) cannot be lower than Low (${snapshot.low}).`);
    }
  }

  if (snapshot.opening !== null && snapshot.opening !== undefined) {
    if (snapshot.high !== null && snapshot.high !== undefined && snapshot.opening > snapshot.high) {
      errors.push(`Opening (${snapshot.opening}) cannot be higher than High (${snapshot.high}).`);
    }
    if (snapshot.low !== null && snapshot.low !== undefined && snapshot.opening < snapshot.low) {
      errors.push(`Opening (${snapshot.opening}) cannot be lower than Low (${snapshot.low}).`);
    }
  }

  if (snapshot.close !== null && snapshot.close !== undefined) {
    if (snapshot.high !== null && snapshot.high !== undefined && snapshot.close > snapshot.high) {
      errors.push(`Close (${snapshot.close}) cannot be higher than High (${snapshot.high}).`);
    }
    if (snapshot.low !== null && snapshot.low !== undefined && snapshot.close < snapshot.low) {
      errors.push(`Close (${snapshot.close}) cannot be lower than Low (${snapshot.low}).`);
    }
  }

  // Check for missing fields (core fields)
  const coreFields: (keyof WinDailySnapshot)[] = [
    "previousSettlement", "opening", "high", "low", "close", "volume", "vwap"
  ];

  coreFields.forEach(field => {
    if (snapshot[field] === null || snapshot[field] === undefined) {
      missingFields.push(field);
    }
  });

  // Quality calculation
  let quality: SnapshotQuality = "complete";
  
  const criticalFields: (keyof WinDailySnapshot)[] = ["opening", "high", "low", "close"];
  const hasCriticalMissing = criticalFields.some(f => snapshot[f] === null || snapshot[f] === undefined);

  if (errors.length > 0 || hasCriticalMissing) {
    quality = "insufficient";
  } else if (missingFields.length > 0) {
    quality = "partial";
  }

  return {
    isValid: errors.length === 0,
    quality,
    missingFields,
    errors
  };
}
