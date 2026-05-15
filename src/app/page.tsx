'use client';

import { Header } from "@/components/layout";
import { useMarketLab } from "@/hooks/use-market-lab";
import { TrendingUp, Target, Shield, AlertTriangle, Zap, BrainCircuit } from "lucide-react";

export default function Dashboard() {
  const { stats, trades } = useMarketLab();

  const totalPoints = trades.reduce((acc, t) => acc + t.pointsResult, 0);
  const totalCash = trades.reduce((acc, t) => acc + t.cashResult, 0);

  return (
    <>
      <Header title="Dashboard Operacional" />
      
      <div className="grid grid-4" style={{ marginBottom: '2.5rem' }}>
        <div className="card glass">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 600 }}>RESULTADO TOTAL</p>
            <TrendingUp size={16} color="var(--primary)" />
          </div>
          <h2 style={{ color: totalPoints >= 0 ? 'var(--success)' : 'var(--destructive)' }}>
            {totalPoints > 0 ? '+' : ''}{totalPoints} pts
          </h2>
          <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
            R$ {totalCash.toFixed(2)}
          </p>
        </div>

        <div className="card glass">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 600 }}>TAXA DE ACERTO</p>
            <Target size={16} color="var(--success)" />
          </div>
          <h2>{(stats.winRate * 100).toFixed(1)}%</h2>
          <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
            {stats.winners} W / {stats.losers} L
          </p>
        </div>

        <div className="card glass">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 600 }}>PAYOFF</p>
            <Zap size={16} color="var(--warning)" />
          </div>
          <h2>{stats.payoff.toFixed(2)}</h2>
          <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Exp. Mat: {stats.mathExpectation.toFixed(2)}
          </p>
        </div>

        <div className="card glass">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 600 }}>DISCIPLINA</p>
            <Shield size={16} color="var(--info)" />
          </div>
          <h2>{stats.avgDisciplineScore > 0 ? stats.avgDisciplineScore.toFixed(1) : 'N/A'}</h2>
          <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
            {stats.outOfPlanTrades} fora do plano
          </p>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
            <BrainCircuit size={20} color="var(--primary)" />
            <h3>Análise de Hipóteses</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Melhor Hipótese:</span>
              <span className="badge badge-success">{stats.bestHypothesis || 'N/A'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Pior Hipótese:</span>
              <span className="badge badge-danger">{stats.worstHypothesis || 'N/A'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Erro mais Recurrente:</span>
              <span style={{ textTransform: 'capitalize' }}>{stats.mostFrequentError}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
            <AlertTriangle size={20} color="var(--destructive)" />
            <h3>Gestão de Risco</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Max Drawdown:</span>
              <span style={{ color: 'var(--destructive)' }}>{stats.maxDrawdown} pts</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Maior Sequência Loss:</span>
              <span>{stats.maxLossStreak} trades</span>
            </div>
            {stats.outOfPlanTrades > 2 && (
              <div className="badge badge-danger" style={{ textAlign: 'center', padding: '0.5rem' }}>
                ALERTA: EXCESSO DE TRADES FORA DO PLANO
              </div>
            )}
          </div>
        </div>
      </div>

      <section style={{ marginTop: '3rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Últimos Trades</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Hipótese</th>
                <th>Lado</th>
                <th>Pontos</th>
                <th>Plano?</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              {trades.slice(-5).reverse().map(trade => (
                <tr key={trade.id}>
                  <td>{trade.date}</td>
                  <td><span className="badge" style={{ background: 'var(--muted)' }}>{trade.hypothesisId}</span></td>
                  <td>
                    <span style={{ color: trade.side === 'comprado' ? 'var(--success)' : 'var(--destructive)' }}>
                      {trade.side.toUpperCase()}
                    </span>
                  </td>
                  <td>{trade.pointsResult}</td>
                  <td>{trade.followedPlan ? '✅' : '❌'}</td>
                  <td>
                    <span className={trade.pointsResult >= 0 ? 'badge badge-success' : 'badge badge-danger'}>
                      R$ {trade.cashResult.toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
              {trades.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>Nenhum trade registrado ainda.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
