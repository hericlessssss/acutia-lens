import { useState } from 'react';
import { Heart, ShoppingCart, Eye, Tag, Check, Trash2 } from 'lucide-react';
import { Photo } from '@/lib/types';
import { useStore } from '@/contexts/StoreContext';
import { useToast } from '@/hooks/use-toast';
import { PhotoModal } from './PhotoModal';

interface PhotoCardProps {
  photo: Photo;
  purchased?: boolean;
}

export function PhotoCard({ photo, purchased = false }: PhotoCardProps) {
  const { addToCart, removeFromCart, isFavorite, toggleFavorite, cart } = useStore();
  const [modalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();

  const isFav = isFavorite(photo.id);
  const isInCart = cart.some(item => item.photo.id === photo.id);

  const handleToggleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(photo.id);
    // State updates automatically via context
    if (!isFav) {
      toast({ title: '❤️ Favoritado!', duration: 1500 });
    } else {
      toast({ title: 'Removido dos favoritos', duration: 1500 });
    }
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInCart) {
      removeFromCart(photo.id);
      toast({ title: 'Removido do carrinho', duration: 1500 });
    } else {
      addToCart(photo);
      toast({ title: '🛒 Adicionado ao carrinho!', duration: 1500 });
    }
  };

  const price = (photo.priceCents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <>
      <div className="group relative overflow-hidden rounded-xl border border-border bg-surface-1 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        <div
          className={`relative aspect-[4/3] overflow-hidden cursor-pointer ${!purchased ? 'watermark-overlay' : ''}`}
          onClick={() => setModalOpen(true)}
        >
          <img
            src={photo.url}
            alt={`Foto ${photo.id}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {!purchased && (
            <div className="absolute inset-0 bg-background/10" />
          )}
          <div className="absolute top-2 right-2 flex gap-1">
            <button
              onClick={handleToggleFav}
              className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-all ${isFav ? 'bg-error/80 text-white' : 'bg-surface-1/60 text-text-1 hover:bg-surface-1/80'
                }`}
            >
              <Heart className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
            </button>
          </div>
          {photo.matchScore !== undefined && (
            <span className="absolute top-2 left-2 rounded-full bg-primary/90 px-2.5 py-1 text-[11px] font-bold text-primary-foreground backdrop-blur-md">
              Match: {photo.matchScore}%
            </span>
          )}
        </div>
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-display font-bold text-primary">{price}</span>
            <span className="text-xs text-text-2">{photo.photographerName}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {photo.tags.map(tag => (
              <span key={tag} className="inline-flex items-center gap-0.5 rounded-md bg-surface-2 px-2 py-0.5 text-[11px] text-text-2">
                <Tag className="h-2.5 w-2.5" />{tag}
              </span>
            ))}
          </div>
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleCartClick}
              className={`group/cart flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all duration-300 ${isInCart
                ? "bg-success hover:bg-error text-white shadow-sm"
                : "bg-primary text-white hover:bg-primary-hover"
                }`}
            >
              {isInCart ? (
                <>
                  <Check className="h-3.5 w-3.5 group-hover/cart:hidden" />
                  <Trash2 className="h-3.5 w-3.5 hidden group-hover/cart:block" />
                  <span className="group-hover/cart:hidden">No Carrinho</span>
                  <span className="hidden group-hover/cart:inline">Remover</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="h-3.5 w-3.5" />
                  Carrinho
                </>
              )}
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center justify-center rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground hover:bg-secondary transition-colors"
            >
              <Eye className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
      <PhotoModal photo={photo} open={modalOpen} onClose={() => setModalOpen(false)} purchased={purchased} />
    </>
  );
}
