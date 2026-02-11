import { useState } from 'react';
import { X } from 'lucide-react';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: (name: string, email: string) => void;
}

export function LoginModal({ open, onClose, onLogin }: LoginModalProps) {
  const [name, setName] = useState('João Silva');
  const [email, setEmail] = useState('joao@email.com');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-bg/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-md mx-4 rounded-xl border border-border bg-surface-1 p-6 shadow-2xl animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold text-text-1">Entrar <span className="text-text-2 text-sm font-normal">(demo)</span></h2>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-surface-2 transition-colors">
            <X className="h-5 w-5 text-text-2" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-text-2 mb-1 block">Nome</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm text-text-1 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-text-3"
              placeholder="Seu nome"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-text-2 mb-1 block">Email</label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              className="w-full rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm text-text-1 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-text-3"
              placeholder="seu@email.com"
            />
          </div>
          <button
            onClick={() => onLogin(name, email)}
            disabled={!name || !email}
            className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-hover disabled:opacity-50 transition-colors"
          >
            Entrar (Demo)
          </button>
          <p className="text-xs text-center text-text-3">
            Login simulado — nenhum dado real é enviado.
          </p>
        </div>
      </div>
    </div>
  );
}
