export type SnapshotQuality = "complete" | "partial" | "insufficient";

export interface EconomicAgendaItem {
  time: string;
  event: string;
  impact: "low" | "medium" | "high";
  actual?: string;
  forecast?: string;
  previous?: string;
}

export interface RelevantNewsItem {
  time: string;
  headline: string;
  source: string;
  impact: "neutral" | "positive" | "negative";
}

export interface WinDailySnapshot {
  date: string;
  asset: "WIN";
  contract: string;
  previousSettlement: number | null;
  opening: number | null;
  high: number | null;
  low: number | null;
  close: number | null;
  volume: number | null;
  vwap: number | null;
  dollarFuture: number | null;
  ibovespaSpot: number | null;
  sp500: number | null;
  nasdaq: number | null;
  economicAgenda: EconomicAgendaItem[];
  relevantNews: RelevantNewsItem[];
  source: "manual" | "jules" | "api";
  quality: SnapshotQuality;
  missingFields: string[];
}

export interface SnapshotValidationResult {
  isValid: boolean;
  quality: SnapshotQuality;
  missingFields: string[];
  errors: string[];
}
