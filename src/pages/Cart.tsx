import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { storage } from '@/lib/storage';
import { CartItem } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { content } from '@/content/ptBR';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Cart = () => {
  const [items, setItems] = useState<CartItem[]>(storage.getCart());
  const { toast } = useToast();

  useEffect(() => {
    // Sync with storage whenever items change
    const handleStorageChange = () => setItems(storage.getCart());
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const remove = (photoId: string) => {
    storage.removeFromCart(photoId);
    setItems(storage.getCart());
    toast({ title: content.cart.removed, duration: 1500 });
  };

  const subtotal = items.reduce((s, i) => s + i.photo.priceCents * i.quantity, 0);
  const platformFee = Math.round(subtotal * 0.05);
  const total = subtotal + platformFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-background">
        <div className="text-center p-8 max-w-md">
          <div className="h-24 w-24 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="font-display text-2xl font-bold mb-3">{content.cart.empty}</h2>
          <p className="text-muted-foreground mb-8 text-lg">{content.cart.emptySubtitle}</p>
          <Button asChild size="lg" className="rounded-xl font-bold shadow-lg shadow-primary/20">
            <Link to="/galeria">
              {content.cart.explore}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild className="rounded-full">
            <Link to="/galeria"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <h1 className="font-display text-3xl font-bold">{content.cart.title}</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.photo.id} className="group flex gap-4 p-4 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-secondary">
                  <img src={item.photo.url} alt="" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-medium text-foreground truncate">{item.photo.photographerName}</h3>
                    <p className="text-sm text-muted-foreground truncate">{item.photo.tags.slice(0, 3).join(', ')}</p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <p className="font-display font-bold text-lg text-primary">{formatCurrency(item.photo.priceCents)}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(item.photo.id)}
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 -mr-2"
                    >
                      <Trash2 className="h-4 w-4 mr-1.5" />
                      Remover
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 space-y-4 shadow-lg">
              <h3 className="font-display font-bold text-lg">{content.cart.summary}</h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal ({items.length} itens)</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>{content.cart.fee}</span>
                  <span>{formatCurrency(platformFee)}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-end">
                <span className="font-medium text-foreground">{content.cart.total}</span>
                <span className="font-display font-bold text-2xl text-primary">{formatCurrency(total)}</span>
              </div>

              <Button asChild className="w-full h-12 text-base font-bold rounded-xl shadow-lg shadow-primary/20 glow-cyan mt-2">
                <Link to="/checkout">
                  {content.cart.checkout} <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>

              <p className="text-xs text-center text-muted-foreground pt-2">
                Compra segura e garantida
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
