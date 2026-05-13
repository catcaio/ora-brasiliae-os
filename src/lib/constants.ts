import { Hypothesis, HypothesisId, MarketStats, Trade } from './types';

export const PROTOCOL = {
  POINTS_VALUE: 0.20,
  MAX_STOP_POINTS: 150,
  MAX_DAILY_LOSS_POINTS: 300,
  MAX_DAILY_TRADES: 4,
  CONTRACT_NAME: 'WIN',
};

export const HYPOTHESES: Record<HypothesisId, Hypothesis> = {
  H1: {
    id: 'H1',
    title: 'Continuidade de alta intradiária',
    description: 'Tendência clara de alta com topos e fundos ascendentes.',
    activation: 'Rompimento da primeira barra de força ou pivô de alta.',
    trigger: 'Superação da máxima do candle de sinal.',
    confirmation: 'Volume crescente na barra de rompimento.',
    invalidation: 'Perda do fundo anterior ou VWAP.',
    defaultStop: 150,
    defaultTarget: 300,
    idealMarket: 'Tendência forte / Gap de alta mantido.',
    prohibitedMarket: 'Lateralidade estreita.',
    typicalPsychError: 'Comprar no topo esticado.',
  },
  H2: {
    id: 'H2',
    title: 'Continuidade de baixa intradiária',
    description: 'Tendência clara de baixa com topos e fundos descendentes.',
    activation: 'Rompimento da primeira barra de força ou pivô de baixa.',
    trigger: 'Perda da mínima do candle de sinal.',
    confirmation: 'Agressão de venda no book.',
    invalidation: 'Superação do topo anterior.',
    defaultStop: 150,
    defaultTarget: 300,
    idealMarket: 'Tendência forte / Gap de baixa mantido.',
    prohibitedMarket: 'Mercado em V (reversão abrupta).',
    typicalPsychError: 'Vender no fundo.',
  },
  H3: {
    id: 'H3',
    title: 'Reversão após falso rompimento',
    description: 'Preço tenta romper máxima/mínima e falha.',
    activation: 'Candle de rejeição em zona de suporte/resistência.',
    trigger: 'Superação/Perda da barra de reversão.',
    confirmation: 'Divergência em indicadores ou volume de exaustão.',
    invalidation: 'Rompimento real da zona com corpo de candle.',
    defaultStop: 120,
    defaultTarget: 250,
    idealMarket: 'Exaustão de movimento.',
    prohibitedMarket: 'Rompimento com momentum forte.',
    typicalPsychError: 'Tentar adivinhar topo/fundo sem sinal.',
  },
  H4: {
    id: 'H4',
    title: 'Pullback em tendência',
    description: 'Correção saudável para média ou VWAP antes de continuar.',
    activation: 'Toque na média móvel (20) ou VWAP com candle gatilho.',
    trigger: 'Rompimento da máxima/mínima do gatilho a favor da tendência.',
    confirmation: 'Rejeição da zona de suporte/resistência dinâmica.',
    invalidation: 'Fechamento abaixo/acima da zona de suporte/resistência.',
    defaultStop: 130,
    defaultTarget: 260,
    idealMarket: 'Tendência clara.',
    prohibitedMarket: 'Mercado "derretendo" ou "foguete" sem respiro.',
    typicalPsychError: 'Medo de entrar no recuo.',
  },
  H5: {
    id: 'H5',
    title: 'Lateralidade / mercado encaixotado',
    description: 'Preço oscila entre dois níveis bem definidos.',
    activation: 'Toque nas extremidades do caixote.',
    trigger: 'Candle de reversão nas bordas.',
    confirmation: 'Osciladores em sobrecompra/sobrevenda.',
    invalidation: 'Fuga definitiva do caixote.',
    defaultStop: 100,
    defaultTarget: 200,
    idealMarket: 'Baixa volatilidade.',
    prohibitedMarket: 'Explosão de volatilidade por notícia.',
    typicalPsychError: 'Operar no meio do caminho.',
  },
  H6: {
    id: 'H6',
    title: 'Fechamento parcial do gap',
    description: 'Preço busca o ajuste ou fechamento do dia anterior.',
    activation: 'Fraqueza na abertura contra o gap.',
    trigger: 'Pivô em direção ao gap.',
    confirmation: 'Vácuo de liquidez no gap.',
    invalidation: 'Rompimento da máxima/mínima do dia na direção oposta.',
    defaultStop: 150,
    defaultTarget: 300,
    idealMarket: 'Gap grande (exaustão).',
    prohibitedMarket: 'Gap de rompimento (continuidade).',
    typicalPsychError: 'Achar que o gap SEMPRE fecha.',
  },
  H7: {
    id: 'H7',
    title: 'Rompimento de máxima/mínima do dia',
    description: 'Preço ganha nova força e rompe limites estabelecidos.',
    activation: 'Acumulação pré-rompimento.',
    trigger: 'Superação da máxima/mínima do dia.',
    confirmation: 'Aumento súbito de volume e agressão.',
    invalidation: 'Retorno para dentro da faixa anterior (trap).',
    defaultStop: 150,
    defaultTarget: 300,
    idealMarket: 'Mercado direcional.',
    prohibitedMarket: 'Mercado lateral / exausto.',
    typicalPsychError: 'Comprar/Vender rompimento tardio.',
  },
  H8: {
    id: 'H8',
    title: 'Operação em torno da VWAP',
    description: 'Uso da VWAP como ímã ou barreira intransponível.',
    activation: 'Preço se afasta muito ou se aproxima da VWAP.',
    trigger: 'Gatilho de retorno ou de defesa na VWAP.',
    confirmation: 'Grande volume na zona da VWAP.',
    invalidation: 'Preço "ignora" a VWAP com força.',
    defaultStop: 120,
    defaultTarget: 240,
    idealMarket: 'Mercado equilibrado.',
    prohibitedMarket: 'Forte tendência sem retorno.',
    typicalPsychError: 'Vender VWAP em dia de tendência forte.',
  },
  H9: {
    id: 'H9',
    title: 'Exaustão de movimento',
    description: 'Movimento climático com barras grandes e volume astronômico.',
    activation: 'Barra elefante no final de um rali.',
    trigger: 'Perda da mínima/máxima da barra climática.',
    confirmation: 'Diminuição drástica de agressão após o pico.',
    invalidation: 'Continuidade do movimento ignorando a exaustão.',
    defaultStop: 150,
    defaultTarget: 400,
    idealMarket: 'Final de pregão ou rali esticado.',
    prohibitedMarket: 'Início de movimento forte.',
    typicalPsychError: 'Tentar parar um trem em movimento.',
  },
  H10: {
    id: 'H10',
    title: 'Dia de ruído alto / não operar',
    description: 'Mercado sem direção, pavios longos, sem liquidez.',
    activation: 'Múltiplos stops em setups claros.',
    trigger: 'Identificação de falta de padrões H1-H9.',
    confirmation: 'Agenda econômica vazia ou feriados lá fora.',
    invalidation: 'Surgimento de um padrão claro de tendência.',
    defaultStop: 0,
    defaultTarget: 0,
    idealMarket: 'Feriado nos EUA.',
    prohibitedMarket: 'Qualquer um.',
    typicalPsychError: 'Vício em clicar / Ansiedade.',
  },
};

export const DISCIPLINE_CRITERIA = [
  'Respeitou horários proibidos',
  'Esperou gatilho formal',
  'Respeitou stop automático',
  'Não fez preço médio',
  'Operou apenas H1–H10',
  'Parou após limite de perda',
  'Registrou prints',
  'Preencheu diário e trades',
  'Evitou overtrading',
  'Encerrou plataforma após plano',
];

export function calculatePoints(entry: number, exit: number, side: 'comprado' | 'vendido'): number {
  return side === 'comprado' ? exit - entry : entry - exit;
}

export function calculateCash(points: number, contracts: number = 1): number {
  return points * PROTOCOL.POINTS_VALUE * contracts;
}

export function calculateStats(trades: Trade[]): MarketStats {
  const winners = trades.filter(t => t.pointsResult > 0);
  const losers = trades.filter(t => t.pointsResult < 0);
  const total = trades.length;

  const avgGain = winners.length > 0 ? winners.reduce((acc, t) => acc + t.pointsResult, 0) / winners.length : 0;
  const avgLoss = losers.length > 0 ? Math.abs(losers.reduce((acc, t) => acc + t.pointsResult, 0) / losers.length) : 0;

  const payoff = avgLoss > 0 ? avgGain / avgLoss : 0;
  const winRate = total > 0 ? winners.length / total : 0;

  // Expectativa Matemática: (WinRate * AvgGain) - (LossRate * AvgLoss)
  const mathExpectation = (winRate * avgGain) - ((1 - winRate) * avgLoss);

  // Simplified Max Drawdown and Loss Streak (can be improved)
  let currentStreak = 0;
  let maxStreak = 0;
  let currentDD = 0;
  let maxDD = 0;
  let peak = 0;
  let balance = 0;

  trades.forEach(t => {
    balance += t.pointsResult;
    if (balance > peak) peak = balance;
    currentDD = peak - balance;
    if (currentDD > maxDD) maxDD = currentDD;

    if (t.pointsResult < 0) {
      currentStreak++;
      if (currentStreak > maxStreak) maxStreak = currentStreak;
    } else {
      currentStreak = 0;
    }
  });

  // Most frequent error
  const errors = trades.map(t => t.errorType).filter(e => e !== 'nenhum');
  const errorCounts = errors.reduce((acc, e) => {
    acc[e] = (acc[e] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const mostFrequentError = (Object.keys(errorCounts).sort((a, b) => errorCounts[b] - errorCounts[a])[0] as any) || 'nenhum';

  // Best/Worst Hypothesis
  const hypoStats = trades.reduce((acc, t) => {
    if (!acc[t.hypothesisId]) acc[t.hypothesisId] = 0;
    acc[t.hypothesisId] += t.pointsResult;
    return acc;
  }, {} as Record<HypothesisId, number>);
  const bestHypo = (Object.keys(hypoStats).sort((a, b) => hypoStats[b as HypothesisId] - hypoStats[a as HypothesisId])[0] as HypothesisId) || null;
  const worstHypo = (Object.keys(hypoStats).sort((a, b) => hypoStats[a as HypothesisId] - hypoStats[b as HypothesisId])[0] as HypothesisId) || null;

  return {
    totalTrades: total,
    winners: winners.length,
    losers: losers.length,
    winRate,
    avgGainPoints: avgGain,
    avgLossPoints: avgLoss,
    payoff,
    mathExpectation,
    maxDrawdown: maxDD,
    maxLossStreak: maxStreak,
    outOfPlanTrades: trades.filter(t => !t.followedPlan).length,
    bestHypothesis: bestHypo,
    worstHypothesis: worstHypo,
    mostFrequentError,
  };
}
