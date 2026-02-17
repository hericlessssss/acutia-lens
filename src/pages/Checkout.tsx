import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, QrCode, Lock, ArrowLeft, Loader2, ShieldCheck } from 'lucide-react';
import { storage } from '@/lib/storage';
import { Order } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { content } from '@/content/ptBR';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const Checkout = () => {
  const user = storage.getUser();
  const cart = storage.getCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState(user.isLoggedIn ? user.name : '');
  const [email, setEmail] = useState(user.isLoggedIn ? user.email : '');
  const [payment, setPayment] = useState<'pix' | 'cartao'>('pix');
  const [processing, setProcessing] = useState(false);

  const subtotal = cart.reduce((s, i) => s + i.photo.priceCents * i.quantity, 0);
  const platformFee = Math.round(subtotal * 0.05);
  const total = subtotal + platformFee;

  const handlePay = () => {
    if (!name || !email) {
      toast({ title: 'Atenção', description: 'Preencha todos os campos para continuar.', variant: 'destructive' });
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      const orderId = `PED-${Date.now().toString().slice(-6)}`;
      const order: Order = {
        id: orderId,
        items: cart,
        date: new Date().toISOString(),
        total,
        platformFee,
        customerName: name,
        customerEmail: email,
        paymentMethod: payment,
        status: 'aprovado',
      };
      storage.addOrder(order);
      storage.setCart([]); // Clear cart properly using setter

      toast({ title: content.checkout.success, description: `Pedido ${orderId} confirmado!` });
      navigate(`/pedido/${orderId}`);
    }, 2500);
  };

  if (cart.length === 0) {
    navigate('/carrinho');
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <Button variant="link" asChild className="pl-0 mb-2 text-muted-foreground">
            <Link to="/carrinho"><ArrowLeft className="h-4 w-4 mr-2" />Voltar ao carrinho</Link>
          </Button>
          <h1 className="font-display text-3xl font-bold">{content.checkout.title}</h1>
        </div>

        <div className="space-y-6">
          {/* Customer info */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
            <h2 className="font-display font-bold text-lg flex items-center gap-2">
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/20 text-primary text-xs">1</span>
              {content.checkout.personalInfo}
            </h2>
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {content.checkout.nameLabel}
                </label>
                <Input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="rounded-xl h-12"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {content.checkout.emailLabel}
                </label>
                <Input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  placeholder="seu@email.com"
                  className="rounded-xl h-12"
                />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
            <h2 className="font-display font-bold text-lg flex items-center gap-2">
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/20 text-primary text-xs">2</span>
              {content.checkout.payment}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setPayment('pix')}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 p-6 transition-all",
                  payment === 'pix'
                    ? "border-primary bg-primary/5 text-primary shadow-sm"
                    : "border-border text-muted-foreground hover:border-primary/30 hover:bg-secondary/50"
                )}
              >
                <QrCode className="h-8 w-8" />
                <span className="font-bold text-sm">Pix Instantâneo</span>
                {payment === 'pix' && <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />}
              </button>
              <button
                onClick={() => setPayment('cartao')}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 p-6 transition-all",
                  payment === 'cartao'
                    ? "border-primary bg-primary/5 text-primary shadow-sm"
                    : "border-border text-muted-foreground hover:border-primary/30 hover:bg-secondary/50"
                )}
              >
                <CreditCard className="h-8 w-8" />
                <span className="font-bold text-sm">Cartão de Crédito</span>
                {payment === 'cartao' && <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />}
              </button>
            </div>

            <p className="text-xs text-muted-foreground bg-secondary/50 p-3 rounded-lg flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              Ambiente seguro. Seus dados estão protegidos.
            </p>
          </div>

          {/* Summary */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
            <h2 className="font-display font-bold text-lg flex items-center gap-2">
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/20 text-primary text-xs">3</span>
              Resumo
            </h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Total dos itens</span>
                <span>{formatCurrency(subtotal / 100)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Taxa de serviço</span>
                <span>{formatCurrency(platformFee / 100)}</span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Total a pagar</span>
              <span className="font-display font-bold text-2xl text-primary">{formatCurrency(total / 100)}</span>
            </div>

            <Button
              onClick={handlePay}
              disabled={processing}
              className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all glow-cyan mt-4"
            >
              {processing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-5 w-5" />
                  Pagar {formatCurrency(total / 100)}
                </>
              )}
            </Button>

            <p className="text-[10px] text-center text-muted-foreground uppercase tracking-wider">
              Pagamento Simulado (Demo)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
