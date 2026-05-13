export type TradeError = 'estatístico' | 'técnico' | 'execução' | 'emocional' | 'nenhum';
export type HypothesisId = 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6' | 'H7' | 'H8' | 'H9' | 'H10';
export type DayType = 'direcional' | 'lateral' | 'volátil';

export interface Hypothesis {
  id: HypothesisId;
  title: string;
  description: string;
  activation: string;
  trigger: string;
  confirmation: string;
  invalidation: string;
  defaultStop: number;
  defaultTarget: number;
  idealMarket: string;
  prohibitedMarket: string;
  typicalPsychError: string;
}

export interface Trade {
  id: string;
  date: string;
  entryTime: string;
  exitTime: string;
  hypothesisId: HypothesisId;
  side: 'comprado' | 'vendido';
  plannedPrice: number;
  executedPrice: number;
  technicalStop: number;
  financialStopPoints: number;
  partialTarget: number;
  finalTarget: number;
  executedExit: number;
  pointsResult: number;
  cashResult: number;
  entryReason: string;
  exitReason: string;
  followedPlan: boolean;
  errorType: TradeError;
  entryPrint?: string;
  exitPrint?: string;
  observation?: string;
}

export interface DailyJournal {
  id: string;
  date: string;
  contract: string;
  macroContext: string;
  spNasdaq: string;
  dollarFuture: string;
  diInterest: string;
  economicAgenda: string;
  opening: number;
  previousSettlement: number;
  gap: number;
  high: number;
  low: number;
  vwap: number;
  volume: string;
  initialTrend: string;
  dayType: DayType;
  mainHypothesis: string;
  shouldTrade: boolean;
  justification: string;
  disciplineScore: number; // 0-10
  disciplineChecklist: boolean[]; // 10 items
  audit: {
    availableAccess: string;
    observedCorrelation: string;
    dominantNoise: string;
    operationHorizon: string;
    coherenceLimit: string;
    lossOfCoherence: string;
    finalReading: string;
  };
}

export interface MarketStats {
  totalTrades: number;
  winners: number;
  losers: number;
  winRate: number;
  avgGainPoints: number;
  avgLossPoints: number;
  payoff: number;
  mathExpectation: number;
  maxDrawdown: number;
  maxLossStreak: number;
  outOfPlanTrades: number;
  bestHypothesis: HypothesisId | null;
  worstHypothesis: HypothesisId | null;
  mostFrequentError: TradeError | null;
}
