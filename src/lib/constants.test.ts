import { describe, it, expect } from 'vitest';
import { calculatePoints, calculateCash, calculateStats, PROTOCOL } from './constants';
import { Trade } from './types';

describe('Market Lab Business Logic', () => {
  it('should calculate points correctly for LONG', () => {
    expect(calculatePoints(100000, 100200, 'comprado')).toBe(200);
    expect(calculatePoints(100000, 99850, 'comprado')).toBe(-150);
  });

  it('should calculate points correctly for SHORT', () => {
    expect(calculatePoints(100000, 99800, 'vendido')).toBe(200);
    expect(calculatePoints(100000, 100150, 'vendido')).toBe(-150);
  });

  it('should calculate cash based on WIN points (0.20 per point)', () => {
    expect(calculateCash(100)).toBe(20);
    expect(calculateCash(-150)).toBe(-30);
  });

  it('should calculate statistics correctly', () => {
    const mockTrades: Trade[] = [
      { id: '1', pointsResult: 200, cashResult: 40, hypothesisId: 'H1', errorType: 'nenhum', followedPlan: true, date: '2026-05-13' } as Trade,
      { id: '2', pointsResult: -100, cashResult: -20, hypothesisId: 'H1', errorType: 'emocional', followedPlan: false, date: '2026-05-13' } as Trade,
      { id: '3', pointsResult: 300, cashResult: 60, hypothesisId: 'H4', errorType: 'nenhum', followedPlan: true, date: '2026-05-13' } as Trade,
    ];

    const stats = calculateStats(mockTrades);
    expect(stats.totalTrades).toBe(3);
    expect(stats.winners).toBe(2);
    expect(stats.winRate).toBeCloseTo(0.666, 2);
    expect(stats.avgGainPoints).toBe(250);
    expect(stats.avgLossPoints).toBe(100);
    expect(stats.payoff).toBe(2.5);
    expect(stats.outOfPlanTrades).toBe(1);
    expect(stats.bestHypothesis).toBe('H4');
    expect(stats.mostFrequentError).toBe('emocional');
  });
});
