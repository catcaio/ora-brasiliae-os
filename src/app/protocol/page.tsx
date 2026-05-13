'use client';

import { Header } from "@/components/layout";
import { Shield, AlertCircle, Clock, ListChecks, Ban, Info } from "lucide-react";

export default function ProtocolPage() {
  return (
    <>
      <Header title="PROTOCOLO WIN V1" />

      <div className="card glass" style={{ marginBottom: '2.5rem', borderLeft: '4px solid var(--primary)' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Shield size={32} color="var(--primary)" />
          <div>
            <h3>Ambiente Laboratório Operational</h3>
            <p>Este sistema é exclusivo para fins educacionais e de auditoria de performance.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-3" style={{ marginBottom: '3rem' }}>
        <div className="card">
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
            <AlertCircle size={20} color="var(--destructive)" />
            <h3>Limites Rígidos</h3>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
            <li>🛑 <strong>Stop Máximo:</strong> 150 pontos</li>
            <li>📉 <strong>Perda Diária:</strong> 300 pontos</li>
            <li>🔢 <strong>Máximo Trades:</strong> 4 por dia</li>
            <li>🚪 <strong>2 Losses Seguidos:</strong> Encerra o dia</li>
          </ul>
        </div>

        <div className="card">
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
            <Clock size={20} color="var(--warning)" />
            <h3>Horários</h3>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
            <li>🚫 <strong>09:00 - 09:30:</strong> Abertura (Volátil)</li>
            <li>✅ <strong>09:30 - 12:00:</strong> Melhor Janela</li>
            <li>🟡 <strong>12:00 - 13:30:</strong> Almoço (Baixo Volume)</li>
            <li>✅ <strong>13:30 - 16:30:</strong> Janela Tarde</li>
            <li>🚫 <strong>Após 17:00:</strong> Encerramento</li>
          </ul>
        </div>

        <div className="card">
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
            <Info size={20} color="var(--info)" />
            <h3>Configuração</h3>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
            <li>📦 <strong>Ativo:</strong> WIN (Mini Ibov)</li>
            <li>📄 <strong>Contratos:</strong> 1 minicontrato</li>
            <li>💰 <strong>Valor Ponto:</strong> R$ 0,20</li>
            <li>❌ <strong>Preço Médio:</strong> PROIBIDO</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card glass">
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1.5rem' }}>
            <ListChecks size={20} color="var(--success)" />
            <h3>Checklist de Entrada</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}><span>1.</span><span>Identificou hipótese H1-H9 clara?</span></div>
            <div style={{ display: 'flex', gap: '0.5rem' }}><span>2.</span><span>Stop técnico é menor que 150 pontos?</span></div>
            <div style={{ display: 'flex', gap: '0.5rem' }}><span>3.</span><span>Relação Risco:Retorno é de no mínimo 1:1.5?</span></div>
            <div style={{ display: 'flex', gap: '0.5rem' }}><span>4.</span><span>Ocorreu o gatilho formal de entrada?</span></div>
            <div style={{ display: 'flex', gap: '0.5rem' }}><span>5.</span><span>Volume confirma o movimento?</span></div>
          </div>
        </div>

        <div className="card glass">
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1.5rem' }}>
            <Ban size={20} color="var(--destructive)" />
            <h3>Checklist NÃO Operar</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}><span>1.</span><span>Mercado em &quot;moedor de carne&quot; (lateralidade estreita)?</span></div>
            <div style={{ display: 'flex', gap: '0.5rem' }}><span>2.</span><span>Notícia de alto impacto em 5-10 minutos?</span></div>
            <div style={{ display: 'flex', gap: '0.5rem' }}><span>3.</span><span>Stop técnico maior que 150 pontos?</span></div>
            <div style={{ display: 'flex', gap: '0.5rem' }}><span>4.</span><span>Vontade de recuperar loss anterior (vingança)?</span></div>
            <div style={{ display: 'flex', gap: '0.5rem' }}><span>5.</span><span>Ruído alto sem padrão definido (H10)?</span></div>
          </div>
        </div>
      </div>
    </>
  );
}
