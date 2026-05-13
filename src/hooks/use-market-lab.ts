import { useState, useEffect } from 'react';
import { DailyJournal, Trade, MarketStats } from '../lib/types';
import { calculateStats, PROTOCOL } from '../lib/constants';

export function useMarketLab() {
  const [journals, setJournals] = useState<DailyJournal[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [stats, setStats] = useState<MarketStats>(calculateStats([]));

  // Load from localStorage
  useEffect(() => {
    const savedJournals = localStorage.getItem('market_lab_journals');
    const savedTrades = localStorage.getItem('market_lab_trades');
    if (savedJournals) setJournals(JSON.parse(savedJournals));
    if (savedTrades) setTrades(JSON.parse(savedTrades));
  }, []);

  // Save to localStorage and update stats
  useEffect(() => {
    localStorage.setItem('market_lab_journals', JSON.stringify(journals));
    localStorage.setItem('market_lab_trades', JSON.stringify(trades));
    setStats(calculateStats(trades));
  }, [journals, trades]);

  const addJournal = (journal: DailyJournal) => {
    setJournals(prev => [...prev, journal]);
  };

  const addTrade = (trade: Trade) => {
    // Validation logic
    const dailyTrades = trades.filter(t => t.date === trade.date);
    
    if (dailyTrades.length >= PROTOCOL.MAX_DAILY_TRADES) {
      alert(`Alerta: Limite de ${PROTOCOL.MAX_DAILY_TRADES} trades por dia atingido.`);
      return;
    }

    const newDailyLosses = dailyTrades.filter(t => t.pointsResult < 0).length + (trade.pointsResult < 0 ? 1 : 0);
    if (newDailyLosses >= 2) {
      alert('Atenção: 2 losses acumulados no dia. Protocolo exige encerramento da sessão.');
    }

    const dailyPoints = dailyTrades.reduce((acc, t) => acc + t.pointsResult, 0);
    if (dailyPoints <= -PROTOCOL.MAX_DAILY_LOSS_POINTS) {
      alert(`Bloqueio: Perda diária de ${PROTOCOL.MAX_DAILY_LOSS_POINTS} pontos atingida. Operações suspensas.`);
      return;
    }

    if (trade.technicalStop > PROTOCOL.MAX_STOP_POINTS) {
      trade.observation = (trade.observation || '') + ' [Trade inválido pelo protocolo: Stop > 150 pts]';
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
