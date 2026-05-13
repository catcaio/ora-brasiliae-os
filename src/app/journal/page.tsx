'use client';

import { useState } from 'react';
import { Header } from "@/components/layout";
import { useMarketLab } from "@/hooks/use-market-lab";
import { DISCIPLINE_CRITERIA } from "@/lib/constants";
import { DailyJournal, DayType } from "@/lib/types";
import { Save, CheckCircle2, ClipboardList, Shield } from "lucide-react";

export default function JournalPage() {
  const { addJournal } = useMarketLab();
  const [activeTab, setActiveTab] = useState<'context' | 'discipline' | 'audit'>('context');

  const [formData, setFormData] = useState<Partial<DailyJournal>>({
    date: new Date().toISOString().split('T')[0],
    contract: 'WIN',
    macroContext: '',
    spNasdaq: '',
    dollarFuture: '',
    diInterest: '',
    economicAgenda: '',
    opening: 0,
    previousSettlement: 0,
    gap: 0,
    high: 0,
    low: 0,
    vwap: 0,
    volume: '',
    initialTrend: '',
    dayType: 'lateral' as DayType,
    mainHypothesis: '',
    shouldTrade: true,
    justification: '',
    disciplineChecklist: new Array(10).fill(false),
    audit: {
      availableAccess: '',
      observedCorrelation: '',
      dominantNoise: '',
      operationHorizon: '',
      coherenceLimit: '',
      lossOfCoherence: '',
      finalReading: '',
    }
  });

  // Helper to update field and recalculate gap
  const updateField = <K extends keyof DailyJournal>(field: K, value: DailyJournal[K]) => {
    setFormData(prev => {
      const next = { ...prev, [field]: value };
      if (field === 'opening' || field === 'previousSettlement') {
        const opening = Number(field === 'opening' ? value : prev.opening) || 0;
        const settlement = Number(field === 'previousSettlement' ? value : prev.previousSettlement) || 0;
        if (opening && settlement) {
          next.gap = opening - settlement;
        }
      }
      return next;
    });
  };

  const handleCheck = (index: number) => {
    const newList = [...(formData.disciplineChecklist || [])];
    newList[index] = !newList[index];
    setFormData({ ...formData, disciplineChecklist: newList });
  };

  const calculateScore = () => {
    return formData.disciplineChecklist?.filter(Boolean).length || 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const score = calculateScore();
    addJournal({
      ...formData,
      id: Date.now().toString(),
      disciplineScore: score,
    } as DailyJournal);
    alert('Diário salvo com sucesso!');
  };

  return (
    <>
      <Header title="Diário do Mercado" />

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button className={`btn ${activeTab === 'context' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setActiveTab('context')}>
          <ClipboardList size={18} /> Contexto & Dados
        </button>
        <button className={`btn ${activeTab === 'discipline' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setActiveTab('discipline')}>
          <CheckCircle2 size={18} /> Disciplina
        </button>
        <button className={`btn ${activeTab === 'audit' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setActiveTab('audit')}>
          <Shield size={18} /> Auditoria
        </button>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          {activeTab === 'context' && (
            <div className="grid grid-2">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="grid grid-2">
                   <div>
                    <label>Data</label>
                    <input type="date" value={formData.date} onChange={e => updateField('date', e.target.value)} className="card glass" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} />
                  </div>
                  <div>
                    <label>Tipo de Dia</label>
                    <select value={formData.dayType} onChange={e => updateField('dayType', e.target.value as DayType)} className="card glass" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}>
                      <option value="lateral">Lateral</option>
                      <option value="direcional">Direcional</option>
                      <option value="volátil">Volátil</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label>Contexto Macro</label>
                  <textarea value={formData.macroContext} onChange={e => updateField('macroContext', e.target.value)} className="card glass" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} rows={3} placeholder="O que está movendo o mundo hoje?"></textarea>
                </div>

                <div className="grid grid-3">
                  <div>
                    <label>S&P 500 / Nasdaq</label>
                    <input type="text" value={formData.spNasdaq} onChange={e => updateField('spNasdaq', e.target.value)} className="card glass" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} />
                  </div>
                  <div>
                    <label>D\u00F3lar Futuro</label>
                    <input type="text" value={formData.dollarFuture} onChange={e => updateField('dollarFuture', e.target.value)} className="card glass" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} />
                  </div>
                  <div>
                    <label>DI / Juros</label>
                    <input type="text" value={formData.diInterest} onChange={e => updateField('diInterest', e.target.value)} className="card glass" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} />
                  </div>
                </div>

                <div>
                  <label>Agenda Econômica</label>
                  <input type="text" value={formData.economicAgenda} onChange={e => updateField('economicAgenda', e.target.value)} className="card glass" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} placeholder="Principais notícias (horários)" />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="grid grid-3">
                  <div>
                    <label>Ajuste Anterior</label>
                    <input type="number" value={formData.previousSettlement} onChange={e => updateField('previousSettlement', Number(e.target.value))} className="card glass" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} />
                  </div>
                  <div>
                    <label>Abertura</label>
                    <input type="number" value={formData.opening} onChange={e => updateField('opening', Number(e.target.value))} className="card glass" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} />
                  </div>
                  <div>
                    <label>Gap (pts)</label>
                    <input type="number" value={formData.gap} onChange={e => updateField('gap', Number(e.target.value))} className="card glass" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} />
                  </div>
                </div>

                <div className="grid grid-4">
                  <div>
                    <label>Máxima</label>
                    <input type="number" value={formData.high} onChange={e => updateField('high', Number(e.target.value))} className="card glass" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} />
                  </div>
                  <div>
                    <label>Mínima</label>
                    <input type="number" value={formData.low} onChange={e => updateField('low', Number(e.target.value))} className="card glass" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} />
                  </div>
                  <div>
                    <label>VWAP</label>
                    <input type="number" value={formData.vwap} onChange={e => updateField('vwap', Number(e.target.value))} className="card glass" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} />
                  </div>
                  <div>
                    <label>Volume</label>
                    <input type="text" value={formData.volume} onChange={e => updateField('volume', e.target.value)} className="card glass" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} />
                  </div>
                </div>

                <div>
                  <label>Tend\u00EAncia Inicial</label>
                  <input type="text" value={formData.initialTrend} onChange={e => updateField('initialTrend', e.target.value)} className="card glass" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} placeholder="Ex: Gap de alta com barra de força" />
                </div>

                <div>
                  <label>Hipótese Principal</label>
                  <input type="text" value={formData.mainHypothesis} onChange={e => updateField('mainHypothesis', e.target.value)} className="card glass" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} placeholder="Qual o plano para hoje?" />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <label>Operar Hoje?</label>
                  <input type="checkbox" checked={formData.shouldTrade} onChange={e => updateField('shouldTrade', e.target.checked)} />
                </div>

                <div>
                  <label>Justificativa</label>
                  <textarea value={formData.justification} onChange={e => updateField('justification', e.target.value)} className="card glass" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} rows={2}></textarea>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'discipline' && (
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3>Checklist de Disciplina</h3>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>{calculateScore()} / 10</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {DISCIPLINE_CRITERIA.map((criterion, index) => (
                  <div 
                    key={index} 
                    onClick={() => handleCheck(index)}
                    className="card glass" 
                    style={{ 
                      padding: '1rem', 
                      cursor: 'pointer', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '1rem',
                      border: formData.disciplineChecklist?.[index] ? '1px solid var(--success)' : '1px solid var(--border)'
                    }}
                  >
                    <div style={{ 
                      width: '20px', 
                      height: '20px', 
                      borderRadius: '4px', 
                      border: '2px solid var(--muted-foreground)',
                      background: formData.disciplineChecklist?.[index] ? 'var(--success)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {formData.disciplineChecklist?.[index] && <CheckCircle2 size={14} color="white" />}
                    </div>
                    <span>{criterion}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="grid grid-2">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label>Correlação Observada</label>
                  <input type="text" value={formData.audit?.observedCorrelation} onChange={e => updateField('audit', {...formData.audit!, observedCorrelation: e.target.value})} className="card glass" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} />
                </div>
                <div>
                  <label>Ruído Dominante</label>
                  <input type="text" value={formData.audit?.dominantNoise} onChange={e => updateField('audit', {...formData.audit!, dominantNoise: e.target.value})} className="card glass" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} />
                </div>
                <div>
                  <label>Horizonte da Operação</label>
                  <input type="text" value={formData.audit?.operationHorizon} onChange={e => updateField('audit', {...formData.audit!, operationHorizon: e.target.value})} className="card glass" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label>Limite de Coerência</label>
                  <input type="text" value={formData.audit?.coherenceLimit} onChange={e => updateField('audit', {...formData.audit!, coherenceLimit: e.target.value})} className="card glass" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} />
                </div>
                <div>
                  <label>Leitura Final</label>
                  <textarea value={formData.audit?.finalReading} onChange={e => updateField('audit', {...formData.audit!, finalReading: e.target.value})} className="card glass" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} rows={5}></textarea>
                </div>
              </div>
            </div>
          )}

          <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center' }}>
            <button type="submit" className="btn btn-primary" style={{ padding: '1rem 3rem' }}>
              <Save size={20} /> Salvar Diário
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
