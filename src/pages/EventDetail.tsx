import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Search, ArrowLeft, Loader2 } from 'lucide-react';
import { mockEvents, mockPhotos } from '@/lib/mockData';
import { PhotoCard } from '@/components/PhotoCard';
import { SkeletonGrid } from '@/components/SkeletonGrid';
import { content } from '@/content/ptBR';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const EventDetail = () => {
  const { id } = useParams();
  const event = mockEvents.find(e => e.id === id);
  const [loading, setLoading] = useState(true);

  const photos = useMemo(() => mockPhotos.filter(p => p.eventId === id), [id]);

  // Simulate loading
  useState(() => {
    const t = setTimeout(() => setLoading(false), 1200); // Slightly longer for realistic feel
    return () => clearTimeout(t);
  });

  if (!event) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4 font-medium text-lg">{content.common.error}</p>
          <Button variant="link" asChild>
            <Link to="/eventos">{content.eventDetail.backToEvents}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 flex flex-col bg-background">
      {/* Hero Banner */}
      <div className="relative h-[40vh] min-h-[300px] overflow-hidden group">
        <img
          src={event.thumbnail}
          alt={event.name}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 pb-10 pt-20 bg-gradient-to-t from-background to-transparent">
          <div className="container mx-auto px-4">
            <Link
              to="/eventos"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white mb-6 transition-colors rounded-full bg-black/20 px-3 py-1 backdrop-blur-md"
            >
              <ArrowLeft className="h-4 w-4" />
              {content.eventDetail.backToEvents}
            </Link>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-md max-w-4xl">
              {event.name}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm sm:text-base text-zinc-300">
              <span className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/5">
                <Calendar className="h-4 w-4 text-primary" />
                {formatDate(event.date)}
              </span>
              <span className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/5">
                <MapPin className="h-4 w-4 text-primary" />
                {event.location}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Controls */}
        <div className="sticky top-[72px] z-30 bg-background/95 backdrop-blur-xl border-b border-border/50 pb-4 mb-8 -mx-4 px-4 pt-4 sm:px-0 sm:mx-0 sm:bg-transparent sm:border-0 sm:static sm:pb-0 transition-all">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <p className="text-foreground font-medium">
                {photos.length}
                <span className="text-muted-foreground font-normal ml-1">{content.eventDetail.photosAvailable}</span>
              </p>
            </div>

            <Link
              to={`/encontrar?eventoId=${event.id}`}
              className="flex items-center gap-2 w-full sm:w-auto justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5"
            >
              <Search className="h-4 w-4" />
              Encontrar minhas fotos
            </Link>
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <SkeletonGrid count={12} />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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

export default EventDetail;
