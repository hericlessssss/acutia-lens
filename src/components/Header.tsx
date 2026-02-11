import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Camera, ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';
import { content } from '@/content/ptBR';
import { LoginModal } from './LoginModal';
import { MobileMenu } from './MobileMenu';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { user, login, logout, cartCount } = useStore();
  const location = useLocation();
  const { toast } = useToast();

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/eventos', label: content.nav.events },
    { to: '/encontrar', label: content.nav.find },
    { to: '/galeria', label: content.nav.gallery },
    { to: '/admin', label: content.nav.admin },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogin = (name: string, email: string) => {
    login(name, email);
    setLoginOpen(false);
    toast({ title: 'Login realizado!', description: `Bem-vindo, ${name}!` });
  };

  const handleLogout = () => {
    logout();
    toast({ title: 'Logout realizado', description: 'Até logo!' });
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "border-border bg-surface-1/90 backdrop-blur-xl shadow-md h-16"
            : "border-transparent bg-transparent h-20"
        )}
      >
        <div className="container mx-auto flex h-full items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 group-hover:glow-cyan transition-all duration-300">
              <Camera className="h-5 w-5 text-primary" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">
              <span className="text-text-1">Acutia</span>{' '}
              <span className="text-primary">Lens</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-surface-2/50 p-1 rounded-full border border-white/5 backdrop-blur-md">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  isActive(link.to)
                    ? "bg-primary text-text-1 shadow-lg shadow-primary/20"
                    : "text-text-2 hover:text-text-1 hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Functional Icons */}
          <div className="flex items-center gap-3">
            <Link
              to="/carrinho"
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 hover:bg-surface-2/80 transition-colors border border-white/5"
              aria-label={content.nav.cart}
            >
              <ShoppingCart className="h-5 w-5 text-text-2 group-hover:text-text-1" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white ring-2 ring-background animate-scale-in shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            {user.isLoggedIn ? (
              <div className="hidden md:flex items-center gap-3 pl-3 border-l border-white/10">
                <span className="text-sm font-medium text-text-1">{user.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="rounded-full hover:bg-destructive/20 hover:text-destructive transition-colors h-10 w-10"
                  title="Sair"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setLoginOpen(true)}
                className="hidden md:flex rounded-full px-5 font-semibold bg-primary hover:bg-primary-hover text-white"
              >
                <User className="h-4 w-4 mr-2" />
                <span>Entrar</span>
              </Button>
            )}

            {/* Mobile Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex md:hidden h-10 w-10 items-center justify-center rounded-full bg-surface-2 hover:bg-surface-2/80 transition-colors"
            >
              <Menu className="h-5 w-5 text-text-1" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <MobileMenu
            navLinks={navLinks}
            user={user}
            isActive={isActive}
            onClose={() => setMenuOpen(false)}
            onLogin={() => setLoginOpen(true)}
            onLogout={handleLogout}
          />
        )}
      </header>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onLogin={handleLogin} />
    </>
  );
}
