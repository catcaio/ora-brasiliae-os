'use client';

import { useState } from 'react';
import { Header } from "@/components/layout";
import { useMarketLab } from "@/hooks/use-market-lab";
import { HYPOTHESES, calculatePoints, calculateCash, PROTOCOL } from "@/lib/constants";
import { HypothesisId, TradeError } from "@/lib/types";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";

export default function TradesPage() {
  const { trades, addTrade, deleteTrade } = useMarketLab();
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    entryTime: '',
    exitTime: '',
    hypothesisId: 'H1' as HypothesisId,
    side: 'comprado' as 'comprado' | 'vendido',
    plannedPrice: 0,
    executedPrice: 0,
    technicalStop: 0,
    financialStopPoints: 150,
    partialTarget: 0,
    finalTarget: 0,
    executedExit: 0,
    entryReason: '',
    exitReason: '',
    followedPlan: true,
    errorType: 'nenhum' as TradeError,
    entryPrint: '',
    exitPrint: '',
    observation: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const points = calculatePoints(formData.executedPrice, formData.executedExit, formData.side);
    const cash = calculateCash(points);

    const newTrade = {
      ...formData,
      id: Date.now().toString(),
      pointsResult: points,
      cashResult: cash,
    };

    addTrade(newTrade);
    setShowForm(false);
  };

  return (
    <>
      <Header title="Registro de Trades" />

      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={18} /> {showForm ? 'Fechar Formulário' : 'Novo Trade'}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <form onSubmit={handleSubmit} className="grid grid-2">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>Data</label>
              <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="card glass" style={{ padding: '0.5rem' }} />
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label>Hora Entrada</label>
                <input type="time" value={formData.entryTime} onChange={e => setFormData({...formData, entryTime: e.target.value})} className="card glass" style={{ padding: '0.5rem' }} />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label>Hora Saída</label>
                <input type="time" value={formData.exitTime} onChange={e => setFormData({...formData, exitTime: e.target.value})} className="card glass" style={{ padding: '0.5rem' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>Hipótese</label>
              <select value={formData.hypothesisId} onChange={e => setFormData({...formData, hypothesisId: e.target.value as HypothesisId})} className="card glass" style={{ padding: '0.5rem' }}>
                {Object.values(HYPOTHESES).map(h => (
                  <option key={h.id} value={h.id}>{h.id} - {h.title}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>Lado</label>
              <select value={formData.side} onChange={e => setFormData({...formData, side: e.target.value as any})} className="card glass" style={{ padding: '0.5rem' }}>
                <option value="comprado">COMPRADO</option>
                <option value="vendido">VENDIDO</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label>Preço Executado</label>
                <input type="number" value={formData.executedPrice} onChange={e => setFormData({...formData, executedPrice: Number(e.target.value)})} className="card glass" style={{ padding: '0.5rem' }} />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label>Saída Executada</label>
                <input type="number" value={formData.executedExit} onChange={e => setFormData({...formData, executedExit: Number(e.target.value)})} className="card glass" style={{ padding: '0.5rem' }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label>Stop Técnico (pts)</label>
                <input type="number" value={formData.technicalStop} onChange={e => setFormData({...formData, technicalStop: Number(e.target.value)})} className="card glass" style={{ padding: '0.5rem' }} />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label>Alvo Final (pts)</label>
                <input type="number" value={formData.finalTarget} onChange={e => setFormData({...formData, finalTarget: Number(e.target.value)})} className="card glass" style={{ padding: '0.5rem' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>Motivo da Entrada</label>
              <textarea value={formData.entryReason} onChange={e => setFormData({...formData, entryReason: e.target.value})} className="card glass" style={{ padding: '0.5rem' }} rows={2}></textarea>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>Print de Entrada (Link)</label>
              <input type="text" value={formData.entryPrint} onChange={e => setFormData({...formData, entryPrint: e.target.value})} className="card glass" style={{ padding: '0.5rem' }} placeholder="https://..." />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>Print de Saída (Link)</label>
              <input type="text" value={formData.exitPrint} onChange={e => setFormData({...formData, exitPrint: e.target.value})} className="card glass" style={{ padding: '0.5rem' }} placeholder="https://..." />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>Erro Operacional</label>
              <select value={formData.errorType} onChange={e => setFormData({...formData, errorType: e.target.value as any})} className="card glass" style={{ padding: '0.5rem' }}>
                <option value="nenhum">Nenhum</option>
                <option value="estatístico">Estatístico</option>
                <option value="técnico">Técnico</option>
                <option value="execução">Execução</option>
                <option value="emocional">Emocional</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={formData.followedPlan} onChange={e => setFormData({...formData, followedPlan: e.target.checked})} />
                Seguiu o Plano?
              </label>
            </div>

            <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button type="submit" className="btn btn-primary">Registrar Trade</button>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Data/Hora</th>
              <th>H</th>
              <th>Lado</th>
              <th>Entrada</th>
              <th>Saída</th>
              <th>Pts</th>
              <th>R$</th>
              <th>Plano</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {trades.slice().reverse().map(trade => (
              <tr key={trade.id}>
                <td>{trade.date} {trade.entryTime}</td>
                <td>{trade.hypothesisId}</td>
                <td style={{ color: trade.side === 'comprado' ? 'var(--success)' : 'var(--destructive)' }}>{trade.side.toUpperCase()}</td>
                <td>{trade.executedPrice}</td>
                <td>{trade.executedExit}</td>
                <td style={{ fontWeight: 600 }}>{trade.pointsResult}</td>
                <td>
                  <span className={trade.cashResult >= 0 ? 'badge badge-success' : 'badge badge-danger'}>
                    R$ {trade.cashResult.toFixed(2)}
                  </span>
                </td>
                <td>{trade.followedPlan ? '✅' : '❌'}</td>
                <td>
                  <button className="btn btn-ghost" onClick={() => deleteTrade(trade.id)} style={{ color: 'var(--destructive)' }}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
