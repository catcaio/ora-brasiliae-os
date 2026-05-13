'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  TrendingUp, 
  Settings, 
  ShieldCheck, 
  Info,
  CheckSquare
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Diário do Dia', href: '/journal', icon: BookOpen },
    { name: 'Registro de Trades', href: '/trades', icon: TrendingUp },
    { name: 'Hipóteses H1-H10', href: '/hypotheses', icon: Info },
    { name: 'Protocolo WIN V1', href: '/protocol', icon: ShieldCheck },
  ];

  return (
    <aside className="sidebar">
      <div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>ORA BRASILIAE</h2>
        <p style={{ fontSize: '0.75rem', fontWeight: 600 }}>MARKET LAB MVP</p>
      </div>
      
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`btn btn-ghost`}
              style={{ 
                justifyContent: 'flex-start',
                background: active ? 'var(--muted)' : 'transparent',
                color: active ? 'var(--foreground)' : 'var(--muted-foreground)'
              }}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div style={{ marginTop: 'auto' }}>
        <div className="card glass" style={{ padding: '1rem', fontSize: '0.75rem' }}>
          <p style={{ color: 'var(--success)', fontWeight: 600, marginBottom: '0.5rem' }}>MODO SANDBOX</p>
          <p>Operacional Educacional</p>
        </div>
      </div>
    </aside>
  );
}

export function Header({ title }: { title: string }) {
  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: '2rem' 
    }}>
      <h1>{title}</h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div className="badge badge-warning">WIN FUTURE</div>
        <div className="badge badge-success">SESSÃO ATIVA</div>
      </div>
    </header>
  );
}
