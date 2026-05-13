import { describe, it, expect } from 'vitest';
import { calculatePoints, calculateCash, calculateStats, validateTrade } from './constants';
import { Trade, DailyJournal } from './types';

describe('Market Lab Business Logic', () => {
  it('should calculate points correctly for LONG', () => {
    expect(calculatePoints(100000, 100200, 'comprado')).toBe(200);
    expect(calculatePoints(100000, 99850, 'comprado')).toBe(-150);
  });

  it('should calculate points correctly for SHORT', () => {
    expect(calculatePoints(100000, 99800, 'vendido')).toBe(200);
    expect(calculatePoints(100000, 100150, 'vendido')).toBe(-150);
  });

  it('should calculate cash based on WIN points and contracts', () => {
    expect(calculateCash(100, 1)).toBe(20);
    expect(calculateCash(100, 5)).toBe(100);
    expect(calculateCash(-150, 2)).toBe(-60);
  });

  it('should calculate statistics correctly including mathExpectation and discipline', () => {
    const mockTrades: Trade[] = [
      { id: '1', pointsResult: 200, cashResult: 40, hypothesisId: 'H1', errorType: 'nenhum', followedPlan: true, date: '2026-05-13' } as Trade,
      { id: '2', pointsResult: -100, cashResult: -20, hypothesisId: 'H1', errorType: 'emocional', followedPlan: false, date: '2026-05-13' } as Trade,
      { id: '3', pointsResult: 300, cashResult: 60, hypothesisId: 'H4', errorType: 'nenhum', followedPlan: true, date: '2026-05-13' } as Trade,
    ];

    const mockJournals = [
      { id: 'j1', disciplineScore: 8, date: '2026-05-13' } as DailyJournal,
      { id: 'j2', disciplineScore: 10, date: '2026-05-13' } as DailyJournal,
    ];

    const stats = calculateStats(mockTrades, mockJournals);
    expect(stats.totalTrades).toBe(3);
    expect(stats.winners).toBe(2);
    expect(stats.winRate).toBeCloseTo(0.666, 2);
    expect(stats.avgGainPoints).toBe(250);
    expect(stats.avgLossPoints).toBe(100);
    expect(stats.payoff).toBe(2.5);
    expect(stats.mathExpectation).toBeCloseTo(133.33, 2);
    expect(stats.avgDisciplineScore).toBe(9);
  });

  it('should validate trade rules: max daily loss (-300 pts)', () => {
    const dailyTrades: Trade[] = [
      { pointsResult: -200, entryTime: '09:30' } as Trade
    ];
    const newTrade = { pointsResult: -150, entryTime: '10:30' } as Trade;
    
    const result = validateTrade(newTrade, dailyTrades);
    expect(result.valid).toBe(false);
    expect(result.alert).toContain('Bloqueio');
  });

  it('should validate trade rules: 2 consecutive losses', () => {
    const dailyTrades: Trade[] = [
      { pointsResult: -100, entryTime: '09:00' } as Trade
    ];
    const newTrade = { pointsResult: -50, entryTime: '10:00' } as Trade;
    
    const result = validateTrade(newTrade, dailyTrades);
    expect(result.valid).toBe(true); // Valid to add, but triggers alert
    expect(result.alert).toContain('2 losses consecutivos');
  });

  it('should detect stop > 150 points', () => {
    const newTrade = { pointsResult: 100, technicalStop: 200, entryTime: '11:00' } as Trade;
    const result = validateTrade(newTrade, []);
    expect(result.valid).toBe(true);
    expect(result.autoObservation).toContain('Stop > 150 pts');
  });
});
