import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ImageOff, Check } from 'lucide-react';
import { mockPhotos } from '@/lib/mockData';
import { useStore } from '@/contexts/StoreContext';
import { PhotoCard } from '@/components/PhotoCard';
import { Photo } from '@/lib/types';
import { content } from '@/content/ptBR';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const Gallery = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'minhas' ? 'minhas' : 'todas';
  const [tab, setTab] = useState<'minhas' | 'todas'>(initialTab);
  const [tagFilter, setTagFilter] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'price_asc' | 'match'>('recent');

  const { matchedPhotos } = useStore();

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    mockPhotos.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  const photos = useMemo(() => {
    let pool: Photo[] = tab === 'minhas' ? matchedPhotos : mockPhotos;
    if (tagFilter) pool = pool.filter(p => p.tags.includes(tagFilter));

    return [...pool].sort((a, b) => {
      if (sortBy === 'price_asc') return a.priceCents - b.priceCents;
      if (sortBy === 'match') return (b.matchScore ?? 0) - (a.matchScore ?? 0);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [tab, tagFilter, sortBy, matchedPhotos]);

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold mb-2">{content.nav.gallery}</h1>
            <p className="text-muted-foreground">{content.common.filter} & {content.common.search}</p>
          </div>

          {/* Tabs */}
          <div className="bg-secondary/50 p-1 rounded-xl flex border border-border">
            <button
              onClick={() => setTab('minhas')}
              className={cn(
                "px-6 py-2.5 rounded-lg text-sm font-bold transition-all",
                tab === 'minhas'
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50"
              )}
            >
              Minhas Fotos
              {matchedPhotos.length > 0 && (
                <Badge variant="secondary" className="ml-2 bg-white/20 text-white hover:bg-white/30 border-0">
                  {matchedPhotos.length}
                </Badge>
              )}
            </button>
            <button
              onClick={() => setTab('todas')}
              className={cn(
                "px-6 py-2.5 rounded-lg text-sm font-bold transition-all",
                tab === 'todas'
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50"
              )}
            >
              Todas as Fotos
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-4 mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filtros:</span>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <select
              value={tagFilter}
              onChange={e => setTagFilter(e.target.value)}
              className="h-10 rounded-xl border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer min-w-[140px]"
            >
              <option value="">Todas as tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'recent' | 'price_asc' | 'match')}
              className="h-10 rounded-xl border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer min-w-[140px]"
            >
              <option value="recent">Mais recentes</option>
              <option value="price_asc">Menor preço</option>
              <option value="match">Melhor match</option>
            </select>

            {(tagFilter || sortBy !== 'recent') && (
              <button
                onClick={() => { setTagFilter(''); setSortBy('recent'); }}
                className="text-xs font-bold text-destructive hover:text-destructive/80 transition-colors whitespace-nowrap"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        {photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 rounded-3xl border border-dashed border-border bg-secondary/10">
            <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center mb-6">
              <ImageOff className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold mb-2">{content.common.empty}</h3>
            <p className="text-muted-foreground text-center max-w-sm">
              {tab === 'minhas'
                ? 'Envie uma selfie em "Encontrar Fotos" para ver resultados aqui.'
                : 'Tente ajustar os filtros para encontrar o que procura.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {photos.map(photo => (
              <PhotoCard
                key={photo.id}
                photo={photo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
