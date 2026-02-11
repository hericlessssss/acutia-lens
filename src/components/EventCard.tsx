import { Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight, Camera } from 'lucide-react';
import { EventData } from '@/lib/types';
import { content } from '@/content/ptBR';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface EventCardProps {
  event: EventData;
}

export function EventCard({ event }: EventCardProps) {
  const isEnded = event.status === 'encerrado';

  return (
    <Link
      to={`/evento/${event.id}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={event.thumbnail}
          alt={event.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80" />

        {/* Status Badge */}
        <Badge
          className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-sm ${!isEnded
              ? 'bg-primary text-primary-foreground hover:bg-primary'
              : 'bg-muted text-muted-foreground hover:bg-muted'
            }`}
        >
          {isEnded ? content.events.status.ended : content.events.status.active}
        </Badge>
      </div>

      <div className="p-5 space-y-3 relative">
        <h3 className="font-display font-bold text-lg leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {event.name}
        </h3>

        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary/70" />
            {formatDate(event.date)}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary/70" />
            {event.location}
          </span>
          {event.photoCount && (
            <span className="flex items-center gap-2">
              <Camera className="h-4 w-4 text-primary/70" />
              {event.photoCount} fotos
            </span>
          )}
        </div>

        <div className="pt-3 flex items-center gap-2 text-sm font-bold text-primary">
          Ver cobertura
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
