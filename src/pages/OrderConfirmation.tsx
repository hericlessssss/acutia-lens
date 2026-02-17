import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Download, ArrowLeft, Package, Home } from 'lucide-react';
import { storage } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { content } from '@/content/ptBR';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const OrderConfirmation = () => {
  const { id } = useParams();
  const order = storage.getOrder(id || '');
  const { toast } = useToast();

  if (!order) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-background">
        <div className="text-center p-8">
          <div className="h-24 w-24 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground mb-6 font-medium text-lg">{content.common.error}</p>
          <Button asChild>
            <Link to="/">{content.order.backToHome}</Link>
          </Button>
        </div>
      </div>
    );
  }

  const downloadAll = () => {
    order.items.forEach(item => {
      window.open(item.photo.url + '?download=1', '_blank');
    });
    toast({ title: content.order.downloadStarted, duration: 2000 });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2 text-muted-foreground">
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" /> {content.order.backToHome}
          </Link>
        </Button>

        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-500/10 mb-6 ring-8 ring-green-500/5">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="font-display text-4xl font-bold mb-3">{content.order.success}</h1>
          <p className="text-xl text-muted-foreground mb-4">{content.order.subtitle}</p>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-1.5 text-sm font-semibold text-green-500">
            Alta resolução liberada (demo)
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Order details */}
          <div className="md:col-span-1 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-display font-bold text-lg mb-4">{content.order.orderInfo}</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-muted-foreground block text-xs uppercase tracking-wider mb-1">Pedido</span>
                  <span className="font-mono font-medium">{order.id}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs uppercase tracking-wider mb-1">Data</span>
                  <span className="font-medium">{formatDate(order.date)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs uppercase tracking-wider mb-1">Cliente</span>
                  <span className="font-medium">{order.customerName}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs uppercase tracking-wider mb-1">Pagamento</span>
                  <span className="font-medium capitalize">{order.paymentMethod}</span>
                </div>

                <Separator />

                <div>
                  <span className="text-muted-foreground block text-xs uppercase tracking-wider mb-1">Total</span>
                  <span className="font-display font-bold text-xl text-primary">{formatCurrency(order.total / 100)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Downloads */}
          <div className="md:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-lg">{content.order.photos} <span className="text-muted-foreground ml-1">({order.items.length})</span></h2>
                <Button onClick={downloadAll} size="sm" className="shadow-md shadow-primary/20">
                  <Download className="h-4 w-4 mr-2" />
                  {content.order.downloadAll}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {order.items.map(item => (
                  <div key={item.photo.id} className="group relative rounded-xl overflow-hidden border border-border bg-secondary aspect-[4/3]">
                    <img src={item.photo.url} alt="" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button variant="secondary" size="sm" onClick={() => window.open(item.photo.url + '?download=1', '_blank')} className="font-bold">
                        <Download className="h-4 w-4 mr-2" /> Baixar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button variant="outline" size="lg" asChild className="rounded-xl border-2">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" /> Voltar para Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
