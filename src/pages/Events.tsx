import { useState, useMemo } from 'react';
import { Search, Filter, CalendarDays } from 'lucide-react';
import { mockEvents } from '@/lib/mockData';
import { EventCard } from '@/components/EventCard';
import { content } from '@/content/ptBR';
import { cn } from '@/lib/utils';

const Events = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'todos' | 'ativo' | 'encerrado'>('todos');

  const filtered = useMemo(() => {
    return mockEvents.filter(e => {
      const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.location.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === 'todos' || e.status === filter;
      return matchSearch && matchFilter;
    });
  }, [search, filter]);

  const filters = [
    { id: 'todos', label: content.events.all },
    { id: 'ativo', label: content.events.status.active },
    { id: 'encerrado', label: content.events.status.ended },
  ] as const;

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12 text-center md:text-left">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            {content.events.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {content.events.subtitle}
          </p>
        </div>

        {/* Filters & Search */}
        <div className="sticky top-20 z-30 bg-background/95 backdrop-blur-xl border-b border-border/50 pb-6 mb-8 -mx-4 px-4 pt-4 sm:static sm:bg-transparent sm:border-0 sm:p-0 sm:mx-auto max-w-4xl">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={content.common.search}
                className="w-full rounded-2xl border border-border bg-secondary/50 pl-12 pr-4 py-4 text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-background transition-all shadow-sm"
              />
            </div>

            <div className="flex bg-secondary/50 p-1 rounded-2xl border border-border overflow-hidden">
              {filters.map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "flex-1 px-6 py-3 text-sm font-bold rounded-xl transition-all duration-200",
                    filter === f.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-border rounded-3xl bg-card/30">
              <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center mb-6">
                <CalendarDays className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">{content.common.empty}</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Não encontramos eventos com os filtros atuais. Tente buscar por outro termo.
              </p>
              <button
                onClick={() => { setSearch(''); setFilter('todos'); }}
                className="mt-6 text-primary font-bold hover:underline"
              >
                {content.common.clearFilters}
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
