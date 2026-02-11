import { Link } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { User as UserType } from '@/lib/types';
import { content } from '@/content/ptBR';

interface MobileMenuProps {
    navLinks: { to: string; label: string }[];
    user: UserType;
    isActive: (path: string) => boolean;
    onClose: () => void;
    onLogin: () => void;
    onLogout: () => void;
}

export function MobileMenu({ navLinks, user, isActive, onClose, onLogin, onLogout }: MobileMenuProps) {
    return (
        <div className="md:hidden border-t border-border bg-surface-1/95 backdrop-blur-xl animate-fade-in absolute w-full left-0 shadow-2xl h-[calc(100vh-64px)] z-50">
            <nav className="container mx-auto flex flex-col gap-2 p-6">
                {navLinks.map(link => (
                    <Link
                        key={link.to}
                        to={link.to}
                        onClick={onClose}
                        className={cn(
                            "flex items-center px-4 py-4 rounded-xl text-base font-medium transition-all",
                            isActive(link.to)
                                ? "bg-primary/10 text-primary"
                                : "text-text-2 hover:text-text-1 hover:bg-surface-2"
                        )}
                    >
                        {link.label}
                    </Link>
                ))}
                <div className="h-px bg-border my-2" />
                {user.isLoggedIn ? (
                    <button
                        onClick={() => { onLogout(); onClose(); }}
                        className="flex items-center w-full px-4 py-4 rounded-xl text-base font-medium text-destructive hover:bg-destructive/10 transition-colors"
                    >
                        <LogOut className="h-5 w-5 mr-3" />
                        Sair ({user.name})
                    </button>
                ) : (
                    <button
                        onClick={() => { onLogin(); onClose(); }}
                        className="flex items-center w-full px-4 py-4 rounded-xl text-base font-bold text-white bg-primary hover:bg-primary-hover transition-colors justify-center"
                    >
                        <User className="h-5 w-5 mr-2" />
                        Entrar na Conta
                    </button>
                )}
            </nav>
        </div>
    );
}
