import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Plus, X, Users, Eye, Search, ShoppingCart, DollarSign, CheckCircle, Clock, Calendar, ChevronRight } from 'lucide-react';
import { mockAdminStats, mockRevenueByEvent } from '@/lib/mockData';
import { EventData } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useStore } from '@/contexts/StoreContext';

const Admin = () => {
  const { events, addEvent, photographers, togglePhotographerStatus } = useStore();
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({ name: '', date: '', location: '' });
  const { toast } = useToast();

  const stats = [
    { label: 'Visitas Totais', value: mockAdminStats.visits.toLocaleString(), icon: Eye, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Buscas Faciais', value: mockAdminStats.searches.toLocaleString(), icon: Search, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Add ao Carrinho', value: mockAdminStats.cartAdds.toLocaleString(), icon: ShoppingCart, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: 'Vendas Realizadas', value: mockAdminStats.purchases.toLocaleString(), icon: DollarSign, color: 'text-green-500', bg: 'bg-green-500/10' },
  ];

  const createEvent = () => {
    if (!newEvent.name) {
      toast({ title: 'Erro', description: 'Nome do evento é obrigatório', variant: 'destructive' });
      return;
    }
    const evt: EventData = {
      id: `evt-${Date.now()}`,
      name: newEvent.name,
      date: newEvent.date || new Date().toISOString().split('T')[0],
      location: newEvent.location || 'Local a definir',
      thumbnail: `https://picsum.photos/seed/new${Date.now()}/800/500`,
      status: 'ativo',
    };
    addEvent(evt);
    setNewEvent({ name: '', date: '', location: '' });
    setShowCreateEvent(false);
    toast({ title: 'Evento criado!', description: `${evt.name} foi adicionado com sucesso.` });
  };

  const togglePhotographer = (id: string) => {
    togglePhotographerStatus(id);
    toast({ title: 'Status atualizado', description: 'Permissão do fotógrafo alterada.', duration: 1500 });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold">Dashboard Admin</h1>
            <p className="text-muted-foreground">Visão geral simulada para gestores.</p>
          </div>
          <Badge variant="outline" className="w-fit border-primary/20 bg-primary/5 text-primary">
            Ambiente de Demonstração
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(s => (
            <Card key={s.label} className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card transition-colors">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`p-3 rounded-xl ${s.bg} ${s.color}`}>
                  <s.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
                  <h3 className="font-display text-2xl font-bold">{s.value}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Revenue Chart */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Receita por Evento (Mock)</CardTitle>
                <CardDescription>Desempenho financeiro dos últimos eventos.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockRevenueByEvent}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                      tickLine={false}
                      axisLine={false}
                      dy={10}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                      tickFormatter={v => `R$${(v / 100).toFixed(0)}`}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: 'hsl(var(--muted)/0.3)' }}
                      contentStyle={{
                        background: 'hsl(var(--popover))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.75rem',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        color: 'hsl(var(--popover-foreground))'
                      }}
                      formatter={(value: number) => [formatCurrency(value), 'Receita']}
                    />
                    <Bar
                      dataKey="receita"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                      barSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Events Management */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Eventos Recentes</CardTitle>
                  <CardDescription>Gerencie os eventos ativos no sistema.</CardDescription>
                </div>
                <Button size="sm" onClick={() => setShowCreateEvent(true)}>
                  <Plus className="h-4 w-4 mr-2" /> Novo Evento
                </Button>
              </CardHeader>
              <CardContent>
                {showCreateEvent && (
                  <div className="mb-6 p-6 rounded-xl border border-primary/20 bg-primary/5 space-y-4 animate-in fade-in slide-in-from-top-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-primary">Criar Novo Evento</h4>
                      <Button variant="ghost" size="icon" onClick={() => setShowCreateEvent(false)} className="h-8 w-8 hover:bg-primary/10">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid gap-4">
                      <Input
                        value={newEvent.name}
                        onChange={e => setNewEvent({ ...newEvent, name: e.target.value })}
                        placeholder="Nome do evento (ex: Campeonato Brasileiro)"
                        className="bg-background"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          value={newEvent.date}
                          onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                          type="date"
                          className="bg-background"
                        />
                        <Input
                          value={newEvent.location}
                          onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
                          placeholder="Local"
                          className="bg-background"
                        />
                      </div>
                      <Button onClick={createEvent} className="w-full font-bold">
                        Confirmar Criação
                      </Button>
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  {events.map(evt => (
                    <div key={evt.id} className="group flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-all border border-transparent hover:border-border/50">
                      <img src={evt.thumbnail} alt="" className="h-12 w-12 rounded-lg object-cover shadow-sm" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate text-foreground">{evt.name}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {formatDate(evt.date)}</span>
                          <span>•</span>
                          <span className="truncate">{evt.location}</span>
                        </div>
                      </div>
                      <Badge variant={evt.status === 'ativo' ? 'default' : 'secondary'} className="capitalize">
                        {evt.status}
                      </Badge>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            {/* Photographers */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Fotógrafos
                </CardTitle>
                <CardDescription>Aprovação de parceiros.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {photographers.map(p => (
                  <div key={p.id} className="flex items-start gap-3 p-3 rounded-xl border border-border bg-card hover:bg-secondary/20 transition-colors">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground">
                      {p.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{p.email}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-md">
                          {p.photosCount} fotos
                        </span>
                        <button
                          onClick={() => togglePhotographer(p.id)}
                          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide transition-all ${p.status === 'aprovado'
                            ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                            : 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
                            }`}
                        >
                          {p.status === 'aprovado' ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                          {p.status}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
