import { useState, useEffect, useMemo } from 'react';
import { DailyJournal, Trade } from '../lib/types';
import { calculateStats, validateTrade } from '../lib/constants';

export function useMarketLab() {
  const [journals, setJournals] = useState<DailyJournal[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('market_lab_journals');
    return saved ? JSON.parse(saved) : [];
  });

  const [trades, setTrades] = useState<Trade[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('market_lab_trades');
    return saved ? JSON.parse(saved) : [];
  });

  const stats = useMemo(() => calculateStats(trades, journals), [trades, journals]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('market_lab_journals', JSON.stringify(journals));
    localStorage.setItem('market_lab_trades', JSON.stringify(trades));
  }, [journals, trades]);

  const addJournal = (journal: DailyJournal) => {
    setJournals(prev => [...prev, journal]);
  };

  const addTrade = (trade: Trade) => {
    const dailyTrades = trades.filter(t => t.date === trade.date);
    const validation = validateTrade(trade, dailyTrades);

    if (!validation.valid) {
      throw new Error(validation.alert);
    }

    if (validation.alert) {
      alert(validation.alert);
    }

    if (validation.autoObservation) {
      trade.observation = (trade.observation || '') + validation.autoObservation;
    }

    setTrades(prev => [...prev, trade]);
  };

  const deleteTrade = (id: string) => {
    setTrades(prev => prev.filter(t => t.id !== id));
  };

  return {
    journals,
    trades,
    stats,
    addJournal,
    addTrade,
    deleteTrade,
  };
}
