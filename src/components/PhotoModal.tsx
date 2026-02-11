import { X, Tag, User, Calendar, Download } from 'lucide-react';
import { Photo } from '@/lib/types';
import { mockEvents } from '@/lib/mockData';

interface PhotoModalProps {
  photo: Photo;
  open: boolean;
  onClose: () => void;
  purchased?: boolean;
}

export function PhotoModal({ photo, open, onClose, purchased = false }: PhotoModalProps) {
  if (!open) return null;

  const event = mockEvents.find(e => e.id === photo.eventId);
  const price = (photo.priceCents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        className="w-full max-w-3xl rounded-xl border border-border bg-card shadow-2xl animate-scale-in overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className={`relative aspect-video ${!purchased ? 'watermark-overlay' : ''}`}>
          <img src={photo.url} alt={`Foto ${photo.id}`} className="h-full w-full object-cover" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/60 backdrop-blur-md hover:bg-background/80 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          {photo.matchScore !== undefined && (
            <span className="absolute top-3 left-3 rounded-full bg-primary/90 px-3 py-1.5 text-sm font-bold text-primary-foreground backdrop-blur-md">
              Match: {photo.matchScore}% (demo)
            </span>
          )}
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl font-bold text-accent">{price}</span>
            {purchased && (
              <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                ✅ Alta resolução liberada (demo)
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              {photo.photographerName}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {new Date(photo.createdAt).toLocaleDateString('pt-BR')}
            </div>
          </div>
          {event && (
            <p className="text-sm text-muted-foreground">
              Evento: <span className="text-foreground">{event.name}</span>
            </p>
          )}
          <div className="flex flex-wrap gap-1.5">
            {photo.tags.map(tag => (
              <span key={tag} className="inline-flex items-center gap-1 rounded-md bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
                <Tag className="h-3 w-3" />{tag}
              </span>
            ))}
          </div>
          {purchased ? (
            <button
              onClick={() => window.open(photo.url + '?download=1', '_blank')}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Download className="h-4 w-4" />
              Baixar em alta resolução
            </button>
          ) : (
            <div className="relative group">
              <button
                disabled
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-muted py-3 text-sm font-semibold text-muted-foreground cursor-not-allowed"
              >
                <Download className="h-4 w-4" />
                Baixar
              </button>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-lg bg-foreground px-3 py-1.5 text-xs text-background opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Compre para baixar em alta resolução
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
