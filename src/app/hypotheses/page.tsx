'use client';

import { Header } from "@/components/layout";
import { HYPOTHESES } from "@/lib/constants";
import { Brain, Target, ShieldAlert, Zap, Ban, AlertCircle } from "lucide-react";

export default function HypothesesPage() {
  return (
    <>
      <Header title="Dicionário de Hipóteses H1-H10" />
      
      <p style={{ marginBottom: '2.5rem', maxWidth: '800px' }}>
        O Protocolo WIN V1 exige que toda operação seja baseada em uma destas 10 hipóteses. 
        Se o cenário não se encaixa, a recomendação é <strong>não operar (H10)</strong>.
      </p>

      <div className="grid grid-2">
        {Object.values(HYPOTHESES).map((h) => (
          <div key={h.id} className="card glass" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="badge" style={{ background: 'var(--primary)', color: 'white', marginBottom: '0.5rem', display: 'inline-block' }}>{h.id}</span>
                <h3>{h.title}</h3>
              </div>
              <Brain size={24} color="var(--primary)" />
            </div>

            <p style={{ fontSize: '0.875rem' }}>{h.description}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Target size={16} color="var(--success)" style={{ flexShrink: 0 }} />
                <span><strong>Gatilho:</strong> {h.trigger}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Zap size={16} color="var(--info)" style={{ flexShrink: 0 }} />
                <span><strong>Confirmação:</strong> {h.confirmation}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <ShieldAlert size={16} color="var(--destructive)" style={{ flexShrink: 0 }} />
                <span><strong>Invalidação:</strong> {h.invalidation}</span>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />

            <div className="grid grid-2" style={{ fontSize: '0.75rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--success)', marginBottom: '0.25rem' }}>
                  <CheckCircle size={12} /> <strong>MERCADO IDEAL</strong>
                </div>
                <p style={{ color: 'var(--foreground)' }}>{h.idealMarket}</p>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--destructive)', marginBottom: '0.25rem' }}>
                  <Ban size={12} /> <strong>PROIBIDO</strong>
                </div>
                <p style={{ color: 'var(--foreground)' }}>{h.prohibitedMarket}</p>
              </div>
            </div>

            <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--destructive)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                <AlertCircle size={14} /> ERRO PSICOLÓGICO TÍPICO
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--foreground)' }}>{h.typicalPsychError}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function CheckCircle({ size }: { size: number }) {
  return <Zap size={size} />;
}
